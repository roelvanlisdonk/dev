var am;
(function (am) {
    var systemUsingCallbacks;
    (function (systemUsingCallbacks) {
        "use strict";
        console.log("system.callback.js loaded.");
        var seen = {};
        var internalRegistry = {};
        var externalRegistry = {};
        var anonymousEntry;
        var headEl = document.getElementsByTagName("head")[0];
        var ie = /MSIE/.test(navigator.userAgent);
        function createScriptNode(src, callback, info) {
            console.log("createScriptNode - " + src);
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
        function isArray(obj) {
            return obj && obj.constructor === Array;
        }
        function ensuredExecute(name) {
            console.log("ensuredExecute - " + name);
            var mod = internalRegistry[name];
            if (mod && !seen[name]) {
                seen[name] = true;
                mod.execute();
            }
            else {
                var stop = "";
            }
            return mod && mod.proxy;
        }
        function get(name) {
            console.log("get - " + name);
            return externalRegistry[name] || ensuredExecute(name);
        }
        function has(name) {
            console.log("has - " + name);
            return !!externalRegistry[name] || !!internalRegistry[name];
        }
        function load(name, onSuccess) {
            console.log("load - " + name);
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
            console.log("fetchAndEval - " + info.normalizedName);
            var url = (System.baseURL || "/") + info.normalizedName + ".js";
            createScriptNode(url, onScriptLoad, info);
        }
        function getModuleFromInternalRegistry(name) {
            console.log("getModuleFromInternalRegistry - " + name);
            var mod = internalRegistry[name];
            if (!mod) {
                throw new Error("Error loading module " + name);
            }
            return mod;
        }
        function handleLoadedModule(info) {
            console.log("handleLoadedModule - " + info.normalizedName);
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
            console.log("loadDependencies - " + parentInfo.normalizedName);
            for (var i = 0; i < deps.length; i++) {
                var dep = deps[i];
                loadDependency(dep, parentInfo);
            }
        }
        function loadDependency(name, parentInfo) {
            console.log("loadDependency - " + name);
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
        function normalizeName(child, parentBase) {
            console.log("normalizeName - " + child);
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
        function onScriptLoad(info) {
            console.log("onScriptLoad - " + info.normalizedName);
            if (anonymousEntry) {
                System.register(info.normalizedName, anonymousEntry[0], anonymousEntry[1]);
                anonymousEntry = undefined;
            }
            var mod = getModuleFromInternalRegistry(info.normalizedName);
            info.mod = mod;
            info.total = mod.deps.length;
            handleLoadedModule(info);
        }
        function register(name, deps, wrapper) {
            var nameAsString = name.toString() || "module has no dependencies.";
            console.log("register - " + nameAsString);
            if (isArray(name)) {
                anonymousEntry = [];
                anonymousEntry.push.apply(anonymousEntry, arguments);
                return;
            }
            var proxy = {};
            var values = {};
            var depsAsArray = deps;
            var mod;
            var meta;
            internalRegistry[nameAsString] = mod = {
                proxy: proxy,
                values: values,
                deps: depsAsArray.map(function (dep) {
                    console.log("deps - " + dep);
                    return normalizeName(dep, nameAsString.split("/").slice(0, -1));
                }),
                dependants: [],
                update: function (moduleName, moduleObj) {
                    console.log("update - " + moduleName);
                    meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
                },
                execute: function () {
                    console.log("execute");
                    mod.deps.map(function (dep) {
                        console.log("map - " + dep);
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
                console.log("wrapper - " + identifier);
                values[identifier] = value;
                mod.lock = true;
                for (var i = 0, length_1 = mod.dependants.length; i < length_1; i++) {
                    var moduleName = mod.dependants[i];
                    if (internalRegistry[moduleName] && !internalRegistry[moduleName].lock) {
                        internalRegistry[moduleName].update(name, values);
                    }
                }
                mod.lock = false;
                if (!proxy[identifier]) {
                    proxy[identifier] = values[identifier];
                }
                return value;
            });
        }
        function set(name, values) {
            console.log("set - " + name);
            externalRegistry[name] = values;
        }
        function updateParentInfo(info) {
            console.log("updateParentInfo - " + info.normalizedName);
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
        var System = {
            "baseURL": "",
            "set": set,
            "get": get,
            "has": has,
            "import": load,
            "register": register
        };
        var amWindow = window;
        amWindow.System = System;
        function getMainModuleName() {
            console.log("getMainModuleName");
            if (document.querySelector) {
                var scriptTag = document.querySelector("script[data-main]");
                return scriptTag.getAttribute("data-main");
            }
            else {
                var scripts = document.getElementsByTagName('script');
                for (var i = 0, length_2 = scripts.length; i < length_2; i++) {
                    var script = scripts[i];
                    var moduleName = script.getAttribute("data-main");
                    if (moduleName) {
                        return moduleName;
                    }
                }
            }
            throw new Error("Could not find script tag in head with attribute data-main.");
        }
        function loadMain() {
            console.log("loadMain");
            var moduleName = getMainModuleName();
            console.log("Loading module " + moduleName);
            System["import"](moduleName, function onSuccess(mod) {
                console.log("Loaded module " + moduleName);
            });
        }
        systemUsingCallbacks.loadMain = loadMain;
        loadMain();
    })(systemUsingCallbacks = am.systemUsingCallbacks || (am.systemUsingCallbacks = {}));
})(am || (am = {}));
//# sourceMappingURL=system.callback.js.map