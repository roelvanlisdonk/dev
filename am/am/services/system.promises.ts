/**
 * The system loader is an adjusted version of the https://github.com/caridy/es6-micro-loader
 */
namespace am.systemUsingPromises {
    "use strict";

    const headEl = document.getElementsByTagName("head")[0],
        ie = /MSIE/.test(navigator.userAgent);

    /**
     *  normalizeName() is inspired by Ember's loader:
     *  https://github.com/emberjs/ember.js/blob/0591740685ee2c444f2cfdbcebad0bebd89d1303/packages/loader/lib/main.js#L39-L53
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

    const seen = Object.create(null);
    const internalRegistry = Object.create(null);
    const externalRegistry = Object.create(null);
    let anonymousEntry: any;

    function ensuredExecute(name: string): boolean {
        const mod = internalRegistry[name];
        if (mod && !seen[name]) {
            seen[name] = true;
            // one time operation to execute the module body
            mod.execute();
        }
        return mod && mod.proxy;
    }

    function set(name: string, values: any): void {
        externalRegistry[name] = values;
    }

    function get(name: string): any {
        return externalRegistry[name] || ensuredExecute(name);
    }

    function has(name: string): boolean {
        return !!externalRegistry[name] || !!internalRegistry[name];
    }

    function createScriptNode(src: string, callback: any) {
        const node = document.createElement("script");
        // use async=false for ordered async?
        // parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
        if (node.async) {
            node.async = false;
        }
        if (ie) {
            const ieNode: INodeOnreadystatechange = node as any;
            ieNode.onreadystatechange = function() {
                if (/loaded|complete/.test(this.readyState)) {
                    this.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            node.onload = node.onerror = callback;
        }
        node.setAttribute("src", src);
        headEl.appendChild(node);
    }

    function load(name: string) {
        return new Promise(function(resolve, reject) {
            createScriptNode((System.baseURL || "/") + name + ".js", function() {
                if (anonymousEntry) {
                    System.register(name, anonymousEntry[0], anonymousEntry[1]);
                    anonymousEntry = undefined;
                }
                const mod = internalRegistry[name];
                if (!mod) {
                    reject(new Error("Error loading module " + name));
                    return;
                }
                Promise.all(mod.deps.map(function (dep: string) {
                    if (externalRegistry[dep] || internalRegistry[dep]) {
                        return Promise.resolve();
                    }
                    return load(dep);
                })).then(resolve, reject);
            });
        });
    }

    const System: ISystem = {
        baseURL: "",
        set: set,
        get: get,
        has: has,
        import: function(name: string): Promise<any> {
            return new Promise(function(resolve, reject) {
                const normalizedName = normalizeName(name, []);
                const mod = get(normalizedName);
                return mod ? resolve(mod) : load(name).then(function () {
                    const modObject = get(normalizedName);
                     resolve(modObject);

                     // TODO: I don't know why the following original code does not work in chrome.   
                     // return get(normalizedName);
                });
            });
        },
        register: function(name: string| Array<string>, deps: Array<string> | Function, wrapper?: Function) {
            if (Array.isArray(name)) {
                // anounymous module
                anonymousEntry = [];
                anonymousEntry.push.apply(anonymousEntry, arguments);
                return; // breaking to let the script tag to name it.
            }
            const proxy = Object.create(null);
            const values = Object.create(null);
            const depsAsArray = deps as Array<string>;
            let mod: any;
            let meta: any;
            // creating a new entry in the internal registry
            internalRegistry[name] = mod = {
                // live bindings
                proxy: proxy,
                // exported values
                values: values,
                // normalized deps
                deps: depsAsArray.map(function(dep: string) {
                    return normalizeName(dep, name.split("/").slice(0, -1));
                }),
                // other modules that depends on this so we can push updates into those modules
                dependants: [],
                // method used to push updates of deps into the module body
                update: function(moduleName: string, moduleObj: any) {
                    meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
                },
                execute: function() {
                    mod.deps.map(function(dep: string) {
                        let imports = externalRegistry[dep];
                        if (imports) {
                            mod.update(dep, imports);
                        } else {
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
            meta = wrapper(function(identifier: any, value: any) {
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
                        get: function() {
                            return values[identifier];
                        }
                    });
                }
                return value;
            });
        }
    };

    interface ISystem {
        baseURL: string;
        /**
         * Returns a module from the registry by normalized name.
         */
        get(moduleName: string): any;

        // TODO:
        // get<TModule>(moduleName: string): TModule;

        /**
         * Returns whether a given module exists in the registry by normalized module name.
         */
        has(moduleName: string): boolean;

        /**
         * Loads a module by name taking an optional normalized parent name argument.
         * Promise resolves to the module value.
         */
        import(moduleName: string, normalizedParentName?: string): Promise<any>;

        // TODO:
        // import<TModule>(moduleName: string, normalizedParentName?: string): Promise<TModule>;

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

    export function loadMain() {
        const scriptTag = document.querySelector("script[data-main]");
        const moduleName = scriptTag.getAttribute("data-main");

        // Load "main" module.
        console.log(`Loading module ${moduleName}`);
        System.import(moduleName).then(function(mod){
            console.log(`Loaded module ${moduleName}`);
        }).catch(function (err) {
            console.log(err);
        });
    }

    loadMain();
}