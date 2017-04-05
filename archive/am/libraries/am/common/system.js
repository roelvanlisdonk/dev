var am;
(function (am) {
    var store;
    (function (store) {
        store.moduleMap = {};
        store.moduleList = [];
        store.registrationList = [];
    })(store = am.store || (am.store = {}));
})(am || (am = {}));
(function (am) {
    var system;
    (function (system) {
        "use strict";
        var _head = document.head || document.getElementsByTagName("head")[0];
        var _isIE = /MSIE/.test(navigator.userAgent);
        var _moduleMap = am.store.moduleMap;
        var _moduleList = am.store.moduleList;
        var _registrationList = am.store.registrationList;
        var _seperator = "/";
        var _basePath = getBasePath(document.location.pathname);
        function alwaysStartWithSeperator(pathParts) {
            var result = pathParts.join(_seperator);
            if (result[0] !== _seperator) {
                result = _seperator + result;
            }
            return result;
        }
        function createScriptNode(src) {
            var script = document.createElement("script");
            if (_isIE) {
                script["onreadystatechange"] = onreadystatechange;
            }
            else {
                script.onload = onload;
            }
            script.onerror = onerror;
            script.src = src;
            _head.appendChild(script);
        }
        function determineIfAllModuleAreLoaded() {
            var result = true;
            for (var i = 0, length_1 = _moduleList.length; i < length_1; i++) {
                var mod = _moduleList[i];
                if (mod.registration === null) {
                    return false;
                }
            }
            return result;
        }
        function executeModule(mod) {
            var deps = mod.registration.deps;
            var depCount = deps.length;
            for (var i = 0; i < depCount; i++) {
                var pathToModule = deps[i];
                var mod_1 = _moduleMap[pathToModule];
                if (!mod_1.executed) {
                    executeModule(mod_1);
                }
            }
            mod.registrationInfo = mod.registration.fn(function (name, code) {
                mod.exports[name] = code;
            }, {});
            setImports(mod);
            mod.registrationInfo.execute();
            mod.executed = true;
        }
        function executeModules() {
            for (var length_2 = _moduleList.length, i = length_2 - 1; i >= 0; i--) {
                var mod = _moduleList[i];
                if (!mod.executed) {
                    executeModule(mod);
                }
            }
        }
        function getBasePath(pathname) {
            var result = pathname.split(_seperator).slice(0, -1).join(_seperator);
            if (!result) {
                result = _seperator;
            }
            return result;
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
        function getPathToMainModule() {
            var scripts = _head.getElementsByTagName("script");
            for (var i = 0, length_3 = scripts.length; i < length_3; i++) {
                var script = scripts[i];
                var moduleName = script.getAttribute("data-main");
                if (moduleName) {
                    return resolve(moduleName, _basePath);
                }
            }
            throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
        }
        function getPathToModuleFolder(pathToModule) {
            var parts = pathToModule.split(_seperator);
            var folderPath = parts.slice(0, parts.length - 1).join(_seperator);
            return folderPath;
        }
        function getModuleNameFromSrc(src) {
            var location = getLocation(src);
            var name = location.pathname.substring(0, location.pathname.length - 3);
            return name;
        }
        function imports(pathToModule) {
            var exists = _moduleMap[pathToModule];
            if (exists) {
                return exists;
            }
            else {
                var mod = {
                    executed: false,
                    exports: {},
                    pathToModule: pathToModule,
                    registration: null,
                    registrationInfo: null
                };
                _moduleMap[pathToModule] = mod;
                _moduleList.push(mod);
                var src = pathToModule + ".js";
                createScriptNode(src);
                return null;
            }
        }
        function loadMain() {
            var moduleName = getPathToMainModule();
            System["import"](moduleName);
        }
        function onerror(e) {
            console.log("onerror - " + e);
        }
        function onload() {
            var script = this;
            var src = script.src;
            setRegistration(src);
        }
        function onreadystatechange() {
            var script = this;
            var src = script.src;
            var readystate = script["readyState"];
            if (readystate === "loaded") {
                setRegistration(src);
            }
        }
        function resolve(relativePath, basePath) {
            if (!relativePath) {
                return "";
            }
            var resultParts = [];
            if (basePath && basePath.length > 0 && basePath !== _seperator) {
                resultParts = basePath.split(_seperator);
            }
            var parts = relativePath.split(_seperator);
            for (var i = 0, length_4 = parts.length; i < length_4; i++) {
                var part = parts[i];
                if (!part || part === ".") {
                    continue;
                }
                if (part === "..") {
                    resultParts = resultParts.slice(0, -1);
                    continue;
                }
                resultParts.push(part);
            }
            var result = alwaysStartWithSeperator(resultParts);
            return result;
        }
        function register(deps, fn) {
            var registration = {
                deps: deps,
                fn: fn
            };
            _registrationList.push(registration);
        }
        function setImports(mod) {
            var setters = mod.registrationInfo.setters;
            var deps = mod.registration.deps;
            var folderPath = getPathToModuleFolder(mod.pathToModule);
            for (var i = 0, length_5 = deps.length; i < length_5; i++) {
                var pathToDep = deps[i];
                var depAsMod = _moduleMap[pathToDep];
                var depCode = depAsMod.exports;
                var setter = setters[i];
                setter(depCode);
            }
        }
        function setRegistration(src) {
            var name = getModuleNameFromSrc(src);
            var pathToModule = name;
            var mod = _moduleMap[pathToModule];
            var registration = _registrationList.shift();
            mod.registration = registration;
            var deps = mod.registration.deps;
            var folderPath = getPathToModuleFolder(pathToModule);
            for (var i = 0, length_6 = deps.length; i < length_6; i++) {
                var relativePath = deps[i];
                var pathToDep = resolve(relativePath, folderPath);
                deps[i] = pathToDep;
                System['import'](pathToDep);
            }
            var allModulesLoaded = determineIfAllModuleAreLoaded();
            if (allModulesLoaded) {
                executeModules();
            }
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