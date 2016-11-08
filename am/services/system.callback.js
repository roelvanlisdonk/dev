var am;
(function (am) {
    var systemUsingCallbacks;
    (function (systemUsingCallbacks) {
        "use strict";
        var seen = Object.create(null);
        var internalRegistry = Object.create(null);
        var externalRegistry = Object.create(null);
        var anonymousEntry;
        var headEl = document.getElementsByTagName("head")[0], ie = /MSIE/.test(navigator.userAgent);
        function createScriptNode(src, callback, info) {
            var node = document.createElement("script");
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
            }
            else {
                node.onload = node.onerror = function () {
                    callback(info);
                };
            }
            node.setAttribute("src", src);
            headEl.appendChild(node);
        }
        function ensuredExecute(name) {
            var mod = internalRegistry[name];
            if (mod && !seen[name]) {
                seen[name] = true;
                mod.execute();
            }
            return mod && mod.proxy;
        }
        function get(name) {
            return externalRegistry[name] || ensuredExecute(name);
        }
        function has(name) {
            return !!externalRegistry[name] || !!internalRegistry[name];
        }
        function load(name, onSuccess) {
            var endTreeLoading = onSuccess;
            var normalizedName = normalizeName(name, []);
            var moduleAsCode = get(normalizedName);
            if (moduleAsCode && endTreeLoading) {
                endTreeLoading(moduleAsCode);
            }
            else {
                var rootInfo = {
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
        systemUsingCallbacks.load = load;
        function fetchAndEval(info) {
            var url = (System.baseURL || "/") + info.normalizedName + ".js";
            createScriptNode(url, onScriptLoad, info);
        }
        function getModuleFromInternalRegistry(name) {
            var mod = internalRegistry[name];
            if (!mod) {
                throw new Error("Error loading module " + name);
            }
            return mod;
        }
        function onScriptLoad(info) {
            if (anonymousEntry) {
                System.register(info.normalizedName, anonymousEntry[0], anonymousEntry[1]);
                anonymousEntry = undefined;
            }
            var mod = getModuleFromInternalRegistry(info.normalizedName);
            info.mod = mod;
            info.total = mod.deps.length;
            handleLoadedModule(info);
        }
        function handleLoadedModule(info) {
            var mod = info.mod;
            var isRootModule = (info.parentInfo === null);
            var hasDepedencies = (mod.deps.length > 0);
            var shouldExecuteDone = (((isRootModule && !hasDepedencies) || (!isRootModule && !hasDepedencies)));
            if (shouldExecuteDone) {
                var moduleAsCode = get(info.normalizedName);
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
        function loadDependencies(deps, parentInfo) {
            for (var i = 0; i < deps.length; i++) {
                var dep = deps[i];
                loadDependency(dep, parentInfo);
            }
        }
        function loadDependency(name, parentInfo) {
            var normalizedName = normalizeName(name, []);
            var childInfo = {
                counter: 0,
                done: null,
                mod: null,
                normalizedName: normalizedName,
                parentInfo: parentInfo,
                total: 0
            };
            var mod = get(normalizedName);
            if (mod) {
                childInfo.mod = mod;
                handleLoadedModule(childInfo);
            }
            else {
                fetchAndEval(childInfo);
            }
        }
        function updateParentInfo(info) {
            var parentInfo = info.parentInfo;
            if (parentInfo) {
                parentInfo.counter += 1;
                if (parentInfo.counter === parentInfo.total) {
                    var moduleAsCode = get(parentInfo.normalizedName);
                    if (parentInfo.done) {
                        parentInfo.done(moduleAsCode);
                    }
                    if (parentInfo.parentInfo) {
                        updateParentInfo(parentInfo);
                    }
                }
            }
        }
        function normalizeName(child, parentBase) {
            if (child.charAt(0) === "/") {
                child = child.slice(1);
            }
            if (child.charAt(0) !== ".") {
                return child;
            }
            var parts = child.split("/");
            while (parts[0] === "." || parts[0] === "..") {
                if (parts.shift() === "..") {
                    parentBase.pop();
                }
            }
            return parentBase.concat(parts).join("/");
        }
        function register(name, deps, wrapper) {
            if (Array.isArray(name)) {
                anonymousEntry = [];
                anonymousEntry.push.apply(anonymousEntry, arguments);
                return;
            }
            var proxy = Object.create(null);
            var values = Object.create(null);
            var mod;
            var meta;
            internalRegistry[name] = mod = {
                proxy: proxy,
                values: values,
                deps: deps.map(function (dep) {
                    return normalizeName(dep, name.split("/").slice(0, -1));
                }),
                dependants: [],
                update: function (moduleName, moduleObj) {
                    meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
                },
                execute: function () {
                    mod.deps.map(function (dep) {
                        var imports = externalRegistry[dep];
                        if (imports) {
                            mod.update(dep, imports);
                        }
                        else {
                            imports = get(dep) && internalRegistry[dep].values;
                            if (imports) {
                                internalRegistry[dep].dependants.push(name);
                                mod.update(dep, imports);
                            }
                        }
                    });
                    meta.execute();
                }
            };
            meta = wrapper(function (identifier, value) {
                values[identifier] = value;
                mod.lock = true;
                for (var i = 0, length_1 = mod.dependants.length; i < length_1; i++) {
                    var moduleName = mod.dependants[i];
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
        function set(name, values) {
            externalRegistry[name] = values;
        }
        var System = {
            baseURL: "",
            set: set,
            get: get,
            has: has,
            import: load,
            register: register
        };
        var amWindow = window;
        amWindow.System = System;
        function loadMain() {
            var scriptTag = document.querySelector("script[data-main]");
            var moduleName = scriptTag.getAttribute("data-main");
            console.log("Loading module " + moduleName);
            System.import(moduleName, function onSuccess(mod) {
                console.log("Loaded module " + moduleName);
            });
        }
        systemUsingCallbacks.loadMain = loadMain;
        loadMain();
    })(systemUsingCallbacks = am.systemUsingCallbacks || (am.systemUsingCallbacks = {}));
})(am || (am = {}));
//# sourceMappingURL=system.callback.js.map