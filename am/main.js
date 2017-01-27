System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function checkLocation() {
        debugger;
        var a = 1;
        var b = 2 + 2;
    }
    var a;
    return {
        setters: [],
        execute: function () {
            checkLocation();
            exports_1("a", a = "");
        }
    };
});
//# sourceMappingURL=main.js.map