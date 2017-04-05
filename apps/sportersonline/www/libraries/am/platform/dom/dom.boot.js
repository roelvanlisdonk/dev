System.register(["./dom.node"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function boot(nativeNode, app) {
        if (!nativeNode) {
            throw new Error("Please provide nativeNode of type HTMLElement.");
        }
        if (!app) {
            throw new Error("Please provide app of type IVirtualDomNode.");
        }
        var node = {
            component: app,
            parentVdNode: {
                nativeNode: nativeNode,
                tagName: nativeNode.tagName.toLowerCase()
            }
        };
        dom_node_1.renderNode(null, node);
    }
    exports_1("boot", boot);
    var dom_node_1;
    return {
        setters: [
            function (dom_node_1_1) {
                dom_node_1 = dom_node_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dom.boot.js.map