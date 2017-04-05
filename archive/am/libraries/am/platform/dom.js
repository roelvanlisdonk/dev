System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function boot(nativeNode, createRootVirtualDomNode) {
        var vdNode = createRootVirtualDomNode();
        var frag = document.createDocumentFragment();
        var element = document.createElement(vdNode.name);
        var childCount = vdNode.nodes.length;
        for (var i = 0; i < childCount; i++) {
            var childNode = vdNode.nodes[i];
            var text = childNode["text"];
            if (text) {
                element.appendChild(document.createTextNode(text));
            }
            else {
                element.appendChild(document.createElement(childNode.name));
            }
        }
        frag.appendChild(element);
        nativeNode.appendChild(frag);
    }
    exports_1("boot", boot);
    var Renderer;
    return {
        setters: [],
        execute: function () {
            Renderer = (function () {
                function Renderer() {
                }
                Renderer.prototype.toNativeAttribute = function (virtualDomAttribute) {
                    throw new Error("Not implemented exception.");
                };
                Renderer.prototype.toNativeEvent = function (virtualDomEvent) {
                    throw new Error("Not implemented exception.");
                };
                Renderer.prototype.toNativeNode = function (virtualDomNode) {
                    throw new Error("Not implemented exception.");
                };
                Renderer.prototype.toVirtualDomAttribute = function (nativeAttribute) {
                    throw new Error("Not implemented exception.");
                };
                Renderer.prototype.toVirtualDomEvent = function (nativeEvent) {
                    throw new Error("Not implemented exception.");
                };
                Renderer.prototype.toVirtualDomNode = function (nativeNode) {
                    throw new Error("Not implemented exception.");
                };
                return Renderer;
            }());
            exports_1("Renderer", Renderer);
        }
    };
});
//# sourceMappingURL=dom.js.map