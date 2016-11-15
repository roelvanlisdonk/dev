/**
 * The system loader is an adjusted version of the https://github.com/caridy/es6-micro-loader that uses callbacks instead of promises.
 * Primarily used to support older browsers like, IE8, IE9, IE10 and IE11.
 */
namespace am.systemUsingCallbacks {
    "use strict";

    console.log("system.callback.js loaded.");

    const seen: any = {};
    const internalRegistry: any = {};
    const externalRegistry: any = {};
    let anonymousEntry: any;

    const headEl = document.getElementsByTagName("head")[0];
    const ie = /MSIE/.test(navigator.userAgent);

    /**
     * A script tag is used to fetch and eval sources,
     * because fetching the data directly will not allow developers to see / debug the sources in the browser.
     */
    function createScriptNode(src: string, callback: (info: ILoadInfo) => void, info: ILoadInfo) {
        console.log(`createScriptNode - ${src}`);
        const node = document.createElement("script") as any;
        // use async=false for ordered async?
        // parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
        if (node.async) {
            node.async = false;
        }

        if (ie) {
            node["onreadystatechange"] = function () {
                if (/loaded|complete/.test(this.readyState)) {
                    this.onreadystatechange = null;
                    callback(info);
                }
            };
        } else {
            node.onload = node.onerror = function () {
                callback(info);
            };
        }
        node.setAttribute("src", src);
        headEl.appendChild(node);
    }

    function isArray(obj: any): boolean {
        return obj && obj.constructor === Array;
    }

    function ensuredExecute(name: string): boolean {
        console.log(`ensuredExecute - ${name}`);
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

    function get(name: string): any {
        console.log(`get - ${name}`);
        return externalRegistry[name] || ensuredExecute(name);
    }

    function has(name: string): boolean {
        console.log(`has - ${name}`);
        return !!externalRegistry[name] || !!internalRegistry[name];
    }

    export function load(name: string, onSuccess: (mod: any) => void) {
        console.log(`load - ${name}`);
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

    function fetchAndEval(info: ILoadInfo) {
        console.log(`fetchAndEval - ${info.normalizedName}`);
        const url = (System.baseURL || "/") + info.normalizedName + ".js";
        createScriptNode(url, onScriptLoad, info);
    }

    function getModuleFromInternalRegistry(name: string): any {
        console.log(`getModuleFromInternalRegistry - ${name}`);
        const mod = internalRegistry[name];
        if (!mod) {
            throw new Error("Error loading module " + name);
        }
        return mod;
    }

    function handleLoadedModule(info: ILoadInfo) {
        console.log(`handleLoadedModule - ${info.normalizedName}`);
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

        if (!isRootModule && !hasDepedencies) {
            updateParentInfo(info);
        }

        if (hasDepedencies) {
            loadDependencies(mod.deps, info);
        }
    }

    function loadDependencies(deps: Array<string>, parentInfo: ILoadInfo) {
        console.log(`loadDependencies - ${parentInfo.normalizedName}`);
        for (let i = 0; i < deps.length; i++) {
            const dep: string = deps[i];
            loadDependency(dep, parentInfo);
        }
    }

    function loadDependency(name: string, parentInfo: ILoadInfo) {
        console.log(`loadDependency - ${name}`);
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
            fetchAndEval(childInfo);
        }
    }
    
    /**
     * Convert given "relative path" to "absolute path".
     */
    function normalizeName(child: string, parentBase: Array<string>) {
        console.log(`normalizeName - ${child}`);
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
        console.log(`onScriptLoad - ${info.normalizedName}`);
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
        console.log(`register - ${nameAsString}`);

        if (isArray(name)) {
            // Anounymous module (Note: TypeScript modules are generated as anonymous modules).
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
                console.log(`deps - ${dep}`);
                return normalizeName(dep, nameAsString.split("/").slice(0, -1));
            }),
            // other modules that depends on this so we can push updates into those modules
            dependants: [],
            // method used to push updates of deps into the module body
            update: function (moduleName: string, moduleObj: any) {
                console.log(`update - ${moduleName}`);
                meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
            },
            execute: function () {
                console.log(`execute`);
                mod.deps.map(function (dep: string) {
                    console.log(`map - ${dep}`);
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
            console.log(`wrapper - ${identifier}`);
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
        console.log(`set - ${name}`);
        externalRegistry[name] = values;
    }

    function updateParentInfo(info: ILoadInfo) {
        console.log(`updateParentInfo - ${info.normalizedName}`);
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

    function getMainModuleName(): string {
        console.log("getMainModuleName");

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
        console.log("loadMain");

        const moduleName = getMainModuleName();

        // Load "main" module.
        console.log(`Loading module ${moduleName}`);

        // IE8 reserverd keyword "import".
        System["import"](moduleName, function onSuccess(mod){
            console.log(`Loaded module ${moduleName}`);
        });
    }

    loadMain();
}