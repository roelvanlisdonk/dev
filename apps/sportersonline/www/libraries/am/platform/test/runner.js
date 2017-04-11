System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function run() {
        console.log("test runner started.");
    }
    exports_1("run", run);
    return {
        setters: [],
        execute: function () {
            run();
        }
    };
});
//# sourceMappingURL=runner.js.map