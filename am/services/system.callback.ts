/**
 * The system loader is an adjusted version of the https://github.com/caridy/es6-micro-loader that uses callbacks instead of promises.
 * Primarily used to support IE9, IE10 and IE11.
 * For IE8 support we need polyfills for Object.create and Array.map.
 */
namespace am.systemUsingCallbacks {
    "use strict";

    const seen = Object.create(null);
    const internalRegistry = Object.create(null);
    const externalRegistry = Object.create(null);
    let anonymousEntry: any;

    const headEl = document.getElementsByTagName("head")[0],
        ie = /MSIE/.test(navigator.userAgent);

    /**
     * A script tag is used to fetch and eval sources,
     * because fetching the data directly will not allow developers to see / debug the sources in the browser.
     */
    function createScriptNode(src: string, callback: (info: ILoadInfo) => void, info: ILoadInfo) {
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

    function ensuredExecute(name: string): boolean {
        const mod = internalRegistry[name];
        if (mod && !seen[name]) {
            seen[name] = true;
            // one time operation to execute the module body
            mod.execute();
        }
        return mod && mod.proxy;
    }

    function get(name: string): any {
        return externalRegistry[name] || ensuredExecute(name);
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

    function fetchAndEval(info: ILoadInfo) {
        const url = (System.baseURL || "/") + info.normalizedName + ".js";
        createScriptNode(url, onScriptLoad, info);
    }

    function getModuleFromInternalRegistry(name: string): any {
        const mod = internalRegistry[name];
        if (!mod) {
            throw new Error("Error loading module " + name);
        }
        return mod;
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

        if (!isRootModule && !hasDepedencies) {
            updateParentInfo(info);
        }

        if (hasDepedencies) {
            loadDependencies(mod.deps, info);
        }
    }

    function loadDependencies(deps: Array<string>, parentInfo: ILoadInfo) {
        for (let i = 0; i < deps.length; i++) {
            const dep: string = deps[i];
            loadDependency(dep, parentInfo);
        }
    }

    function loadDependency(name: string, parentInfo: ILoadInfo) {
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

    function register(name: string, deps: Array<string>, wrapper: Function) {
        if (Array.isArray(name)) {
            // anounymous module
            anonymousEntry = [];
            anonymousEntry.push.apply(anonymousEntry, arguments);
            return; // breaking to let the script tag to name it.
        }
        const proxy = Object.create(null);
        const values = Object.create(null);
        let mod: any;
        let meta: any;
        // creating a new entry in the internal registry
        internalRegistry[name] = mod = {
            // live bindings
            proxy: proxy,
            // exported values
            values: values,
            // normalized deps
            deps: deps.map(function (dep) {
                return normalizeName(dep, name.split("/").slice(0, -1));
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
            if (!Object.getOwnPropertyDescriptor(proxy, identifier)) {
                Object.defineProperty(proxy, identifier, {
                    enumerable: true,
                    get: function () {
                        return values[identifier];
                    }
                });
            }
            return value;
        });
    }

    function set(name: string, values: any): void {
        externalRegistry[name] = values;
    }

    const System: ISystem = {
        baseURL: "",
        set: set,
        get: get,
        has: has,
        import: load,
        register: register
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

    export function loadMain() {
        const scriptTag = document.querySelector("script[data-main]");
        const moduleName = scriptTag.getAttribute("data-main");

        // Load "main" module.
        console.log(`Loading module ${moduleName}`);
        System.import(moduleName, function onSuccess(mod){
            console.log(`Loaded module ${moduleName}`);
        });
    }

    loadMain();
}