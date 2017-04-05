System.register(["./stylesheet"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function removeClass(node, cssClass) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!cssClass) {
            throw new Error("Please provide cssClass.");
        }
        var element = node.nativeNode;
        element.classList.remove(cssClass.name);
    }
    exports_1("removeClass", removeClass);
    function renderClass(node, cssClass) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!cssClass) {
            throw new Error("Please provide cssClass.");
        }
        stylesheet_1.addClassToStyleSheet(cssClass);
        var element = node.nativeNode;
        element.classList.add(cssClass.name);
    }
    exports_1("renderClass", renderClass);
    var stylesheet_1;
    return {
        setters: [
            function (stylesheet_1_1) {
                stylesheet_1 = stylesheet_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=class.js.map