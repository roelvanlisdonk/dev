System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var VirtualDomAttribute, VirtualDomEvent, VirtualDomNode, VirtualDomTextNode;
    return {
        setters:[],
        execute: function() {
            VirtualDomAttribute = (function () {
                function VirtualDomAttribute() {
                    this.deps = [];
                    this.enabled = true;
                }
                VirtualDomAttribute.prototype.onAdded = function () {
                };
                VirtualDomAttribute.prototype.onChange = function () {
                };
                VirtualDomAttribute.prototype.onRemoved = function () {
                };
                return VirtualDomAttribute;
            }());
            exports_1("VirtualDomAttribute", VirtualDomAttribute);
            VirtualDomEvent = (function () {
                function VirtualDomEvent() {
                }
                VirtualDomEvent.prototype.onAdded = function () {
                };
                VirtualDomEvent.prototype.onChange = function () {
                };
                VirtualDomEvent.prototype.onRemoved = function () {
                };
                return VirtualDomEvent;
            }());
            exports_1("VirtualDomEvent", VirtualDomEvent);
            VirtualDomNode = (function () {
                function VirtualDomNode() {
                }
                VirtualDomNode.prototype.onAdded = function () {
                };
                VirtualDomNode.prototype.onChange = function () {
                };
                VirtualDomNode.prototype.onRemoved = function () {
                };
                return VirtualDomNode;
            }());
            exports_1("VirtualDomNode", VirtualDomNode);
            VirtualDomTextNode = (function (_super) {
                __extends(VirtualDomTextNode, _super);
                function VirtualDomTextNode() {
                    _super.apply(this, arguments);
                }
                return VirtualDomTextNode;
            }(VirtualDomNode));
            exports_1("VirtualDomTextNode", VirtualDomTextNode);
        }
    }
});
//# sourceMappingURL=virtual.dom.js.map