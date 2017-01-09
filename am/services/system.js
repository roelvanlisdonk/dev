var am;
(function (am) {
    var services;
    (function (services) {
        "use strict";
        var head = document.head || document.getElementsByTagName("head")[0];
        var isIE = /MSIE/.test(navigator.userAgent);
        var modulesIndex = {};
        var modules = [];
        var registrations = [];
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
                var mod = modules[i];
                if (!mod.executed) {
                    mod.registrationInfo = mod.registration.fn(function (name, code) {
                        mod.exports[name] = code;
                    }, {});
                    setImports(mod);
                    mod.registrationInfo.execute();
                    mod.executed = true;
                }
            };
            for (var length_1 = modules.length, i = length_1 - 1; i >= 0; i--) {
                _loop_1(length_1, i);
            }
        }
        function setImports(mod) {
            var setters = mod.registrationInfo.setters;
            var deps = mod.registration.deps;
            for (var i = 0, length_2 = deps.length; i < length_2; i++) {
                var dep = deps[i];
                var depCode = imports(dep);
                var setter = setters[i];
                setter(depCode);
            }
        }
        function onerror() {
            console.log("onerror");
        }
        function onload() {
            var script = this;
            var src = script.src;
            console.log("onload - " + src);
            updateModule(src);
        }
        function onreadystatechange() {
            var script = this;
            var src = script.src;
            var readystate = script["readyState"];
            console.log("onreadystatechange - " + readystate + " - " + src);
            if (readystate === "loaded") {
                updateModule(src);
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
            for (var i = 0, length_3 = scripts.length; i < length_3; i++) {
                var script = scripts[i];
                var moduleName = script.getAttribute("data-main");
                if (moduleName) {
                    return moduleName;
                }
            }
            throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
        }
        function imports(name) {
            var basePath = document.location.pathname.split(seperator).slice(0, -1).join(seperator);
            var normalizedName = resolve(name, basePath);
            var mod = {
                executed: false,
                exports: {},
                importName: name,
                loaded: false,
                name: normalizedName,
                registration: null,
                registrationInfo: null
            };
            var exists = modulesIndex[normalizedName];
            if (exists) {
                return exists;
            }
            else {
                modulesIndex[normalizedName] = mod;
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
            basePath = basePath || "";
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
            registrations.push({ deps: deps, fn: fn });
            for (var i = 0, length_4 = deps.length; i < length_4; i++) {
                var name_1 = deps[i];
                System['import'](name_1);
            }
        }
        function updateModule(src) {
            var location = getLocation(src);
            var name = location.pathname.substring(0, location.pathname.length - 3);
            var mod = modulesIndex[name];
            mod.loaded = true;
            mod.registration = registrations.shift();
            modules.push(mod);
            var allModulesLoaded = (registrations.length === 0);
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
    })(services = am.services || (am.services = {}));
})(am || (am = {}));
//# sourceMappingURL=system.js.map