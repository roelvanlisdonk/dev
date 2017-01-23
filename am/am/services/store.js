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
                    var self = this;
                    self.id = cuid_1.cuid();
                    var _onChangeHandlers = [];
                    function _onChange() {
                        var changeHandlers = _onChangeHandlers;
                        for (var i = 0, length_1 = changeHandlers.length; i < length_1; i++) {
                            var handler = changeHandlers[i];
                            handler();
                        }
                    }
                    Object.defineProperty(self, 'onChange', {
                        get: function () {
                            return _onChange;
                        },
                        set: function (handler) {
                            _onChangeHandlers.push(handler);
                        },
                        enumerable: true
                    });
                }
                return StoreObject;
            }());
            exports_1("StoreObject", StoreObject);
            StoreField = (function (_super) {
                __extends(StoreField, _super);
                function StoreField() {
                    _super.call(this);
                    var self = this;
                    var _value;
                    Object.defineProperty(self, 'value', {
                        get: function () {
                            return _value;
                        },
                        set: function (newValue) {
                            _value = newValue;
                            if (_value !== newValue) {
                                _value = newValue;
                                self.onChange();
                            }
                        },
                        enumerable: true
                    });
                }
                return StoreField;
            }(StoreObject));
            exports_1("StoreField", StoreField);
        }
    }
});
//# sourceMappingURL=store.js.map