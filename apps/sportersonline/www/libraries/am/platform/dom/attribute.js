System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function removeAttribute(node, attr) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!attr) {
            throw new Error("Please provide attr.");
        }
        node.nativeNode.removeAttribute(attr.name);
    }
    exports_1("removeAttribute", removeAttribute);
    function renderAttribute(node, attr) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!attr) {
            throw new Error("Please provide attr.");
        }
        var nativeNode = node.nativeNode;
        if (attr.name === "value") {
            nativeNode.value = String(attr.value);
            return;
        }
        nativeNode.setAttribute(attr.name, String(attr.value));
    }
    exports_1("renderAttribute", renderAttribute);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=attribute.js.map