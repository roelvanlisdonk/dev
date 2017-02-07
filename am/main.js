System.register(["./libraries/am/platform/dom", "./libraries/am/ui/virtual.dom", "./libraries/am/storage/store", "./schema/root"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function createRootVirtualDomNode() {
        var node = new virtual_dom_1.VirtualDomNode();
        var root = store_1.getRoot(root_1.Root);
        if (root.user.isAuthorized()) {
            console.log("Show main page");
        }
        else {
            console.log("Show login page");
        }
        return node;
    }
    var dom_1, virtual_dom_1, store_1, root_1, a;
    return {
        setters: [
            function (dom_1_1) {
                dom_1 = dom_1_1;
            },
            function (virtual_dom_1_1) {
                virtual_dom_1 = virtual_dom_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            }
        ],
        execute: function () {
            dom_1.boot(document.body, createRootVirtualDomNode);
            exports_1("a", a = "");
        }
    };
});
//# sourceMappingURL=main.js.map