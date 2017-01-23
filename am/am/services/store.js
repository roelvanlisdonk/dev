System.register(['./cuid'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var cuid_1;
    var StoreObject, StoreField;
    return {
        setters:[
            function (cuid_1_1) {
                cuid_1 = cuid_1_1;
            }],
        execute: function() {
            StoreObject = (function () {
                function StoreObject() {
                    this._onChangeHandlers = [];
                    var self = this;
                    self.id = cuid_1.cuid();
                    self._onChange = function () {
                        var changeHandlers = self._onChangeHandlers;
                        for (var i = 0, length_1 = changeHandlers.length; i < length_1; i++) {
                            var handler = changeHandlers[i];
                            handler();
                        }
                    };
                }
                Object.defineProperty(StoreObject.prototype, "onChange", {
                    get: function () {
                        return this._onChange;
                    },
                    set: function (handler) {
                        this._onChangeHandlers.push(handler);
                    },
                    enumerable: true,
                    configurable: true
                });
                return StoreObject;
            }());
            exports_1("StoreObject", StoreObject);
            StoreField = (function (_super) {
                __extends(StoreField, _super);
                function StoreField() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(StoreField.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        if (this._value !== val) {
                            this._value = val;
                            this.onChange();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return StoreField;
            }(StoreObject));
            exports_1("StoreField", StoreField);
        }
    }
});
//# sourceMappingURL=store.js.map