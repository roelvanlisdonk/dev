// Volgens mij moet je dus bij het laden van een dependency de naam op de stack zetten
// Bij register op de juiste plek toevoegen
// bij load de juiste gebruiken.


/**
 * The system loader is an adjusted version of the https://github.com/caridy/es6-micro-loader that uses callbacks instead of promises.
 * Primarily used to support older browsers like, IE8, IE9, IE10 and IE11.
 */
namespace am.systemUsingCallbacks {
    "use strict";

    let anonymousEntry: any;
    const seen: any = {};
    const internalRegistry: any = {};
    const externalRegistry: any = {};

    const headEl = document.getElementsByTagName("head")[0];
    const ie = /MSIE/.test(navigator.userAgent);

    /**
     * A script tag is used to fetch and eval sources,
     * because fetching the data directly will not allow developers to see / debug the sources in the browser.
     */
    function createScriptNode(src: string, callback: (info: ILoadInfo) => void, info: ILoadInfo, nextDepForIEIndex?: number, depsForIE?: string[]) {
        const node = document.createElement("script") as any;

        // use async=false for ordered async?
        // parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
        if (node.async) {
            node.async = false;
        }

        if (ie) {
            // This code is based on: https://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            node["onreadystatechange"] = function () {    
                if (/loaded|complete/.test(this.readyState)) {

                    // Load next dependecy for IE synchronously.
                     if(depsForIE) {
                        if(nextDepForIEIndex < depsForIE.length) {
                            loadDependency(depsForIE[nextDepForIEIndex], info, nextDepForIEIndex + 1, depsForIE);
                        }

                        if(nextDepForIEIndex === depsForIE.length) {
                            info.parentInfo.total = depsForIE.length;
                            info.parentInfo.counter = depsForIE.length - 1;
                        }
                     }
                    
                    
                    this.onreadystatechange = null;
                    callback(info);
                }
            }
        } else {
            node.onload = node.onerror = function () {
                callback(info);
            };
        }

        // After setting the src attribute the network fetching starts.
        node.setAttribute("src", src);

        // Adding the script tag to the head will start execution of the script in order at which they are added to the head.
        headEl.appendChild(node);
    }

    function isArray(obj: any): boolean {
        return obj && obj.constructor === Array;
    }

    function ensuredExecute(name: string): boolean {
        const mod = internalRegistry[name];
        if (mod && !seen[name]) {
            seen[name] = true;

            // one time operation to execute the module body
            mod.execute();
        }
        else {
            const stop = "";
        }
        return mod && mod.proxy;
    }

    function fetchAndEval(info: ILoadInfo, nextDepForIEIndex?: number, depsForIE?: string[]) {
        const url = (System.baseURL || "/") + info.normalizedName + ".js";
        createScriptNode(url, onScriptLoad, info, nextDepForIEIndex, depsForIE);
    }

    function get(name: string): any {
        return externalRegistry[name] || ensuredExecute(name);
    }
    
    function getModuleFromInternalRegistry(name: string): any {
        const mod = internalRegistry[name];
        if (!mod) {
            throw new Error("Error loading module " + name);
        }
        return mod;
    }

    function handleLoadedModule(info: ILoadInfo) {
        const mod = info.mod;
        const isRootModule = (info.parentInfo === null);
        const hasDepedencies = (mod.deps.length > 0);
        const shouldExecuteDone = (
            ((isRootModule && !hasDepedencies) || (!isRootModule && !hasDepedencies))
        );

        if (shouldExecuteDone) {
            const moduleAsCode = get(info.normalizedName);
            if (info.done) {
                info.done(moduleAsCode);
            }
        }

        const shouldUpdateParentInfo = (!isRootModule && !hasDepedencies);
        if (shouldUpdateParentInfo) {
            updateParentInfo(info);
        }

        if (hasDepedencies) {
            loadDependencies(mod.deps, info);
        }
    }

    function has(name: string): boolean {
        return !!externalRegistry[name] || !!internalRegistry[name];
    }

    export function load(name: string, onSuccess: (mod: any) => void) {
        const endTreeLoading = onSuccess;
        const normalizedName = normalizeName(name, []);

        const moduleAsCode = get(normalizedName);
        if (moduleAsCode && endTreeLoading) {
            endTreeLoading(moduleAsCode);
        } else {

            // To determine, "if all dependencies are loaded", this "rootInfo" object will be passed to and updated during the load process. 
            const rootInfo: ILoadInfo = {
                counter: 0,
                done: endTreeLoading,
                mod: null,
                normalizedName: normalizedName,
                parentInfo: null,
                total: 0
            };

            fetchAndEval(rootInfo);
        }
    }

    function loadDependencies(deps: Array<string>, parentInfo: ILoadInfo) {
        // For IE we have to execute the scripts synchronously, so we supply the next dependency to load indexOf
        // and the dependency array to the "loadDependency" function, so it can load the next dependency, when 
        // it's script is fully loaded.
        if(ie ) {
            loadDependency(deps[0], parentInfo, 1, deps);
        } else {
            for (let i = 0, length = deps.length; i < length; i++) {
                const dep: string = deps[i];
                loadDependency(dep, parentInfo);
            }
        }
    }

    function loadDependency(name: string, parentInfo: ILoadInfo, nextDepForIEIndex?: number, depsForIE?: string[]) {
        const normalizedName = normalizeName(name, []);

        const childInfo: ILoadInfo = {
            counter: 0,
            done: null,
            mod: null,
            normalizedName: normalizedName,
            parentInfo: parentInfo,
            total: 0
        };

        const mod = get(normalizedName);
        if (mod) {
            childInfo.mod = mod;
            handleLoadedModule(childInfo);
        } else {
            fetchAndEval(childInfo, nextDepForIEIndex, depsForIE);
        }
    }
    
    /**
     * Convert given "relative path" to "absolute path".
     */
    function normalizeName(child: string, parentBase: Array<string>) {
        if (child.charAt(0) === "/") {
            child = child.slice(1);
        }
        if (child.charAt(0) !== ".") {
            return child;
        }
        const parts = child.split("/");
        while (parts[0] === "." || parts[0] === "..") {
            if (parts.shift() === "..") {
                parentBase.pop();
            }
        }
        return parentBase.concat(parts).join("/");
    }

    function onScriptLoad(info: ILoadInfo) {
        if (anonymousEntry) {
            // Register as an named module.
            System.register(info.normalizedName, anonymousEntry[0], anonymousEntry[1]);
            anonymousEntry = undefined;
        }

        const mod: IModule = getModuleFromInternalRegistry(info.normalizedName);
        info.mod = mod;
        info.total = mod.deps.length;
        handleLoadedModule(info);
    }
    
    function register(name: string| Array<string>, deps: Array<string> | Function, wrapper?: Function) {
        const nameAsString = name.toString() || "module has no dependencies.";

        if (isArray(name)) {
            // register is called from typescript generated es6 module
            anonymousEntry = [];
            anonymousEntry.push.apply(anonymousEntry, arguments);

            // Breaking to let the script tag to name it (the module will be registered on its "url / path on the filesystem").
            return;
        }

        const proxy: any = {};
        const values: any = {};
        const depsAsArray = deps as Array<string>;
        let mod: any;
        let meta: any;
        
        // creating a new entry in the internal registry
        internalRegistry[nameAsString] = mod = {
            // live bindings
            proxy: proxy,
            // exported values
            values: values,
            // normalized deps
            deps: depsAsArray.map(function (dep) {
                return normalizeName(dep, nameAsString.split("/").slice(0, -1));
            }),
            // other modules that depends on this so we can push updates into those modules
            dependants: [],
            // method used to push updates of deps into the module body
            update: function (moduleName: string, moduleObj: any) {
                meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
            },
            execute: function () {
                mod.deps.map(function (dep: string) {
                    let imports = externalRegistry[dep];
                    if (imports) {
                        mod.update(dep, imports);
                    }
                    else {
                        imports = get(dep) && internalRegistry[dep].values; // optimization to pass plain values instead of bindings
                        if (imports) {
                            internalRegistry[dep].dependants.push(name);
                            mod.update(dep, imports);
                        }
                    }
                });
                meta.execute();
            }
        };
        // collecting execute() and setters[]
        meta = wrapper(function (identifier: any, value: any) {
            values[identifier] = value;
            mod.lock = true; // locking down the updates on the module to avoid infinite loop
            for(let i = 0, length = mod.dependants.length; i < length; i++) {
                const moduleName: string = mod.dependants[i];
                if (internalRegistry[moduleName] && !internalRegistry[moduleName].lock) {
                    internalRegistry[moduleName].update(name, values);
                }
            }
            mod.lock = false;

            // To support IE8 we can't use "getOwnPropertyDescriptor" and "defineProperty" here.
            if(!proxy[identifier]) {
                proxy[identifier] = values[identifier];
            }
            
            return value;
        });
    }

    function set(name: string, values: any): void {
        externalRegistry[name] = values;
    }

    function updateParentInfo(info: ILoadInfo) {
        const parentInfo = info.parentInfo;
        if (parentInfo) {
            parentInfo.counter += 1;
            if (parentInfo.counter === parentInfo.total) {
                const moduleAsCode = get(parentInfo.normalizedName);
                if (parentInfo.done) {
                    parentInfo.done(moduleAsCode);
                }
                if (parentInfo.parentInfo) {
                    updateParentInfo(parentInfo);
                }
            }
        }
    }

    const System: ISystem = {
        "baseURL": "",
        "set": set,
        "get": get,
        "has": has,
        "import": load,
        "register": register
    };

    interface ILoadInfo {
        counter: number;
        done: (info: ILoadInfo) => void,
        mod: IModule,
        normalizedName: string;
        parentInfo?: ILoadInfo,
        total: number;
    }

    interface IModule {
        deps: Array<string>;
        dependants: any;
        execute: () => void;
        proxy: any;
        update: (moduleName: any, moduleObj: any) => void;
        values: any;
    }

    interface ISystem {
        baseURL: string;
        /**
         * Returns a module from the registry by normalized name.
         */
        get(moduleName: string): any;

        /**
         * Returns whether a given module exists in the registry by normalized module name.
         */
        has(moduleName: string): boolean;

        /**
         * Loads a module by name taking an optional normalized parent name argument.
         * Promise resolves to the module value.
         */
        import(name: string, onSuccess: (mod: any) => void): void;

        /**
         * Declaration function for defining modules of the System.register polyfill module format.
         */
        register(name: string, deps: Array<string>, wrapper: Function): void;
        register(deps: Array<string>, wrapper: Function): void;

        /**
         * Sets a module into the registry directly and synchronously.
         * Typically used along with System.newModule to create a valid Module object:
         */
        set(moduleName: string, module: any): void;
    }

    interface IWindow {
        System: ISystem
    }

    // exporting the System object
    const amWindow: IWindow = window as any;
    amWindow.System = System;

    interface INodeOnreadystatechange {
        onreadystatechange: any;
    }

    interface IAnonymousModule {
        normalizedName: string;
        deps: any;
    }

    function getMainModuleName(): string {
        if(document.querySelector) {
            const scriptTag = document.querySelector("script[data-main]");
            return scriptTag.getAttribute("data-main");
        } else {
            // Support < IE8
            const scripts = document.getElementsByTagName('script');
            for(let i = 0, length = scripts.length; i < length; i++) {
                const script = scripts[i];
                const moduleName = script.getAttribute("data-main");
                if(moduleName) {
                    return moduleName;
                }
            }
        }
        throw new Error("Could not find script tag in head with attribute data-main.");
    }

    export function loadMain() {
        const moduleName = getMainModuleName();

        // Load "main" module.
        console.log(`Module ${moduleName} loading started.`);

        // IE8 reserverd keyword "import".
        System["import"](moduleName, function onSuccess(mod){
            console.log(`Module ${moduleName} loading completed.`);
        });
    }

    loadMain();
}