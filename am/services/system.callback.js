var am;
(function (am) {
    var systemUsingCallbacks;
    (function (systemUsingCallbacks) {
        "use strict";
        var anonymousEntry;
        var seen = {};
        var internalRegistry = {};
        var externalRegistry = {};
        var headEl = document.getElementsByTagName("head")[0];
        var ie = /MSIE/.test(navigator.userAgent);
        function createScriptNode(src, callback, info, nextDepForIEIndex, depsForIE) {
            var node = document.createElement("script");
            if (node.async) {
                node.async = false;
            }
            if (ie) {
                node["onreadystatechange"] = function () {
                    if (/loaded|complete/.test(this.readyState)) {
                        if (depsForIE) {
                            if (nextDepForIEIndex < depsForIE.length) {
                                loadDependency(depsForIE[nextDepForIEIndex], info, nextDepForIEIndex + 1, depsForIE);
                            }
                            if (nextDepForIEIndex === depsForIE.length) {
                                info.parentInfo.total = depsForIE.length;
                                info.parentInfo.counter = depsForIE.length - 1;
                            }
                        }
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
        function fetchAndEval(info, nextDepForIEIndex, depsForIE) {
            var url = (System.baseURL || "/") + info.normalizedName + ".js";
            createScriptNode(url, onScriptLoad, info, nextDepForIEIndex, depsForIE);
        }
        function get(name) {
            return externalRegistry[name] || ensuredExecute(name);
        }
        function getModuleFromInternalRegistry(name) {
            var mod = internalRegistry[name];
            if (!mod) {
                throw new Error("Error loading module " + name);
            }
            return mod;
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
            var shouldUpdateParentInfo = (!isRootModule && !hasDepedencies);
            if (shouldUpdateParentInfo) {
                updateParentInfo(info);
            }
            if (hasDepedencies) {
                loadDependencies(mod.deps, info);
            }
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
        function loadDependencies(deps, parentInfo) {
            if (ie) {
                loadDependency(deps[0], parentInfo, 1, deps);
            }
            else {
                for (var i = 0, length_1 = deps.length; i < length_1; i++) {
                    var dep = deps[i];
                    loadDependency(dep, parentInfo);
                }
            }
        }
        function loadDependency(name, parentInfo, nextDepForIEIndex, depsForIE) {
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
                fetchAndEval(childInfo, nextDepForIEIndex, depsForIE);
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
        function register(name, deps, wrapper) {
            var nameAsString = name.toString() || "module has no dependencies.";
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
                    return normalizeName(dep, nameAsString.split("/").slice(0, -1));
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
                for (var i = 0, length_2 = mod.dependants.length; i < length_2; i++) {
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
            externalRegistry[name] = values;
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
            if (document.querySelector) {
                var scriptTag = document.querySelector("script[data-main]");
                return scriptTag.getAttribute("data-main");
            }
            else {
                var scripts = document.getElementsByTagName('script');
                for (var i = 0, length_3 = scripts.length; i < length_3; i++) {
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
            var moduleName = getMainModuleName();
            console.log("Module " + moduleName + " loading started.");
            System["import"](moduleName, function onSuccess(mod) {
                console.log("Module " + moduleName + " loading completed.");
            });
        }
        systemUsingCallbacks.loadMain = loadMain;
        loadMain();
    })(systemUsingCallbacks = am.systemUsingCallbacks || (am.systemUsingCallbacks = {}));
})(am || (am = {}));
//# sourceMappingURL=system.callback.js.map