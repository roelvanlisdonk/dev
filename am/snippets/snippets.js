System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function forLoop() {
        for (var i = 0, length_1 = 100; i < length_1; i++) {
        }
    }
    exports_1("forLoop", forLoop);
    function performanceTiming() {
        var t0 = performance.now();
        var t1 = performance.now();
        console.log("Call to doSomething took $(t1 - t0) milliseconds.");
    }
    exports_1("performanceTiming", performanceTiming);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=snippets.js.map