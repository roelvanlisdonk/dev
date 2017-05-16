System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function myCoolNewFn() {
    }
    function run() {
        console.log("Dit is een test");
    }
    function renderToDom(testcase) {
        var element = document.querySelector(renderer.selector);
    }
    function assert(testcase, check) {
        if (!check) {
            check = isEqualTo;
        }
        testcase.result = check(testcase);
        renderer.render(testcase);
    }
    exports_1("assert", assert);
    function isEqualTo(testcase) {
        return true;
    }
    exports_1("isEqualTo", isEqualTo);
    var renderer;
    return {
        setters: [],
        execute: function () {
            run();
            exports_1("renderer", renderer = {
                render: renderToDom,
                selector: "body"
            });
        }
    };
});
//# sourceMappingURL=core.js.map