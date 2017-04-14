System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function run() {
        console.log("test runner started.");
        window.setTimeout(logMessage, 2000);
    }
    exports_1("run", run);
    function logMessage() {
        console.log("That was really slow!");
    }
    return {
        setters: [],
        execute: function () {
            run();
        }
    };
});
//# sourceMappingURL=runner.js.map