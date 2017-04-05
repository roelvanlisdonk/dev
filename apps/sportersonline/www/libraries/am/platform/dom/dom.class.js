System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function removeClass(node, cssClass) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!cssClass) {
            throw new Error("Please provide cssClass.");
        }
        var vdNode = node.vdNode;
        vdNode.nativeNode.classList.remove(cssClass.name);
    }
    exports_1("removeClass", removeClass);
    function renderClass(node, cssClass) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!cssClass) {
            throw new Error("Please provide cssClass.");
        }
        var vdNode = node.vdNode;
        vdNode.nativeNode.classList.add(cssClass.name);
    }
    exports_1("renderClass", renderClass);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dom.class.js.map