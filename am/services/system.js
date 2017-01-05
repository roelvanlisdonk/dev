var am;
(function (am) {
    var services;
    (function (services) {
        "use strict";
        var modules = {};
        function createScriptNode(src) {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.head.appendChild(script);
        }
        function getMainModuleName() {
            var scripts = document.head.getElementsByTagName('script');
            for (var i = 0, length_1 = scripts.length; i < length_1; i++) {
                var script = scripts[i];
                var moduleName = script.getAttribute("data-main");
                if (moduleName) {
                    return moduleName;
                }
            }
            throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
        }
        function imports(name) {
            createScriptNode('main.js');
        }
        function loadMain() {
            var moduleName = getMainModuleName();
            console.log("Module " + moduleName + " loading started.");
            imports(moduleName);
        }
        function register(deps, fn) {
            console.log('register');
        }
        var windowAsAny = window;
        if (!windowAsAny.System) {
            windowAsAny.System = {};
        }
        windowAsAny.System.import = imports;
        windowAsAny.System.register = register;
        loadMain();
    })(services = am.services || (am.services = {}));
})(am || (am = {}));
//# sourceMappingURL=system.js.map