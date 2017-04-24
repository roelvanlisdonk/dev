System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function spec(title) {
        var specInfo = {
            input: null,
            it: null,
            result: null,
            subject: null
        };
        function given(input) {
        }
        function it(subject) {
        }
        function shouldReturn(data) {
        }
        var result;
    }
    exports_1("spec", spec);
    function run() {
        console.log("Test runner started, realy.");
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
//# sourceMappingURL=core.js.map