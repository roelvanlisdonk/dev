System.register(["./node"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function boot(nativeNode, app) {
        if (!nativeNode) {
            throw new Error("Please provide nativeNode of type HTMLElement.");
        }
        if (!app) {
            throw new Error("Please provide app of type INodeRenderer.");
        }
        app.parentNode = {
            name: nativeNode.tagName.toLowerCase(),
            nativeNode: nativeNode
        };
        node_1.renderNode(null, app);
    }
    exports_1("boot", boot);
    var node_1;
    return {
        setters: [
            function (node_1_1) {
                node_1 = node_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=boot.js.map