System.register(["../common/observable"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    function text(value) {
        var vdNode = new VirtualDomTextNode();
        vdNode.text = value;
        return vdNode;
    }
    exports_1("text", text);
    var observable_1, VirtualDomAttribute, VirtualDomEvent, VirtualDomNode, VirtualDomTextNode;
    return {
        setters: [
            function (observable_1_1) {
                observable_1 = observable_1_1;
            }
        ],
        execute: function () {
            VirtualDomAttribute = (function (_super) {
                __extends(VirtualDomAttribute, _super);
                function VirtualDomAttribute() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.enabled = true;
                    return _this;
                }
                return VirtualDomAttribute;
            }(observable_1.Observable));
            exports_1("VirtualDomAttribute", VirtualDomAttribute);
            VirtualDomEvent = (function (_super) {
                __extends(VirtualDomEvent, _super);
                function VirtualDomEvent() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return VirtualDomEvent;
            }(observable_1.Observable));
            exports_1("VirtualDomEvent", VirtualDomEvent);
            VirtualDomNode = (function (_super) {
                __extends(VirtualDomNode, _super);
                function VirtualDomNode() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.attrs = [];
                    _this.cssClasses = [];
                    _this.events = [];
                    _this.nodes = [];
                    return _this;
                }
                VirtualDomNode.prototype.onAdded = function () {
                };
                VirtualDomNode.prototype.onRemoved = function () {
                };
                return VirtualDomNode;
            }(observable_1.Observable));
            exports_1("VirtualDomNode", VirtualDomNode);
            VirtualDomTextNode = (function (_super) {
                __extends(VirtualDomTextNode, _super);
                function VirtualDomTextNode() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return VirtualDomTextNode;
            }(VirtualDomNode));
            exports_1("VirtualDomTextNode", VirtualDomTextNode);
        }
    };
});
//# sourceMappingURL=virtual.dom.js.map