System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getOSLocale() {
        return "en";
    }
    function getResource(resource) {
        return resource[defaultLocale];
    }
    exports_1("getResource", getResource);
    var defaultLocale;
    return {
        setters: [],
        execute: function () {
            exports_1("defaultLocale", defaultLocale = getOSLocale());
        }
    };
});
//# sourceMappingURL=resource.js.map