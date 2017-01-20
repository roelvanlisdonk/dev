var am;
(function (am) {
    var store;
    (function (store) {
        store.moduleMap = {};
        store.moduleList = [];
        store.registrationList = [];
    })(store = am.store || (am.store = {}));
})(am || (am = {}));
var am;
(function (am) {
    var system;
    (function (system) {
        "use strict";
        var head = document.head || document.getElementsByTagName("head")[0];
        var isIE = /MSIE/.test(navigator.userAgent);
        var moduleMap = am.store.moduleMap;
        var moduleList = am.store.moduleList;
        var registrationList = am.store.registrationList;
        var seperator = "/";
        function createScriptNode(src) {
            var script = document.createElement("script");
            if (isIE) {
                script["onreadystatechange"] = onreadystatechange;
            }
            else {
                script.onload = onload;
            }
            script.onerror = onerror;
            script.src = src;
            head.appendChild(script);
        }
        function executeModules() {
            var _loop_1 = function(length_1, i) {
                var mod = moduleList[i];
                if (!mod.executed) {
                    mod.registrationInfo = mod.registration.fn(function (name, code) {
                        mod.exports[name] = code;
                    }, {});
                    setImports(mod);
                    mod.registrationInfo.execute();
                    mod.executed = true;
                }
            };
            for (var length_1 = moduleList.length, i = length_1 - 1; i >= 0; i--) {
                _loop_1(length_1, i);
            }
        }
        function setImports(mod) {
            var setters = mod.registrationInfo.setters;
            var deps = mod.registration.deps;
            for (var i = 0, length_2 = deps.length; i < length_2; i++) {
                var dep = deps[i];
                var depCode = imports(dep).exports;
                var setter = setters[i];
                setter(depCode);
            }
        }
        function onerror() {
            console.log("onerror");
        }
        function determineIfAllModuleAreLoaded() {
            var result = true;
            for (var i = 0, length_3 = moduleList.length; i < length_3; i++) {
                var mod = moduleList[i];
                if (mod.registration === null) {
                    return false;
                }
            }
            return result;
        }
        function setRegistration(src) {
            var name = getModuleNameFromSrc(src);
            var mod = moduleMap[name];
            var registration = registrationList.shift();
            mod.registration = registration;
            var allModulesLoaded = determineIfAllModuleAreLoaded();
            if (allModulesLoaded) {
                executeModules();
            }
        }
        function onload() {
            var script = this;
            var src = script.src;
            console.log("onload - " + src);
            setRegistration(src);
        }
        function onreadystatechange() {
            var script = this;
            var src = script.src;
            var readystate = script["readyState"];
            console.log("onreadystatechange - " + readystate + " - " + src);
            if (readystate === "loaded") {
                setRegistration(src);
            }
        }
        function getLocation(href) {
            var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
            return match && {
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4],
                pathname: match[5],
                search: match[6],
                hash: match[7]
            };
        }
        function getMainModuleName() {
            var scripts = head.getElementsByTagName("script");
            for (var i = 0, length_4 = scripts.length; i < length_4; i++) {
                var script = scripts[i];
                var moduleName = script.getAttribute("data-main");
                if (moduleName) {
                    return moduleName;
                }
            }
            throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
        }
        function imports(name) {
            var normalizedName = resolve(name);
            console.log("System.import -  " + normalizedName + ".");
            var exists = moduleMap[normalizedName];
            if (exists) {
                return exists;
            }
            else {
                var mod = {
                    executed: false,
                    exports: {},
                    name: normalizedName,
                    registration: null,
                    registrationInfo: null
                };
                moduleMap[normalizedName] = mod;
                moduleList.push(mod);
                var src = normalizedName + ".js";
                createScriptNode(src);
                return null;
            }
        }
        function loadMain() {
            var moduleName = getMainModuleName();
            console.log("Module " + moduleName + " loading started.");
            System['import'](moduleName);
        }
        function resolve(relativePath, basePath) {
            basePath = basePath || document.location.pathname.split(seperator).slice(0, -1).join(seperator);
            if (basePath === seperator) {
                basePath = "";
            }
            if (relativePath.charAt(0) === seperator) {
                relativePath = relativePath.slice(1);
            }
            if (relativePath.charAt(0) === ".") {
                var parts = relativePath.split(seperator).slice(1);
                return [basePath].concat(parts).join(seperator);
            }
            else {
                return [basePath, relativePath].join(seperator);
            }
        }
        function register(deps, fn) {
            console.log("register - " + fn.toString().substring(120, 160));
            var registration = {
                deps: deps,
                fn: fn
            };
            registrationList.push(registration);
            for (var i = 0, length_5 = deps.length; i < length_5; i++) {
                var name_1 = deps[i];
                System['import'](name_1);
            }
        }
        function getModuleNameFromSrc(src) {
            var location = getLocation(src);
            var name = location.pathname.substring(0, location.pathname.length - 3);
            return name;
        }
        var System = {
            'import': imports,
            register: register
        };
        window.System = System;
        loadMain();
    })(system = am.system || (am.system = {}));
})(am || (am = {}));
//# sourceMappingURL=system.js.map