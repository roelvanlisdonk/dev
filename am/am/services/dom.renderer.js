System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Renderer;
    return {
        setters:[],
        execute: function() {
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
    }
});
//# sourceMappingURL=dom.renderer.js.map