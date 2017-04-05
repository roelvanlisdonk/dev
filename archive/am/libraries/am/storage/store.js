System.register(["../common/observable", "./local.storage"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    function getObjectFromLocalStorage(id, schemaType) {
        var json = local_storage_1.clientStorage.getItem(id);
        if (json) {
            var schemaObj = new schemaType();
            var storeObj = JSON.parse(json);
            var keys = Object.keys(storeObj);
            var keyCount = keys.length;
            for (var i = 0; i < keyCount; i++) {
                var key = keys[i];
                var schemaTypeProp = schemaObj[key];
                if (schemaTypeProp === undefined) {
                    continue;
                }
                if (key === "id" || key === "syncType") {
                    schemaObj.id = storeObj[key];
                    continue;
                }
                var storeProp = storeObj[key];
                var isStorePropField = (storeProp.value !== undefined);
                if (schemaTypeProp === null) {
                    if (isStorePropField) {
                        schemaTypeProp = new StoreField();
                    }
                    else {
                        schemaTypeProp = new StoreObject();
                    }
                }
                schemaObj[key] = schemaTypeProp;
                schemaTypeProp.id = storeProp.id;
                if (isStorePropField) {
                    schemaTypeProp.value = storeProp.value;
                }
            }
            return schemaObj;
        }
        return null;
    }
    function getRoot(rootType) {
        var root = _data[rootId];
        if (root) {
            return root;
        }
        root = getObjectFromLocalStorage(rootId, rootType);
        if (root) {
            return root;
        }
        root = new rootType();
        return root;
    }
    exports_1("getRoot", getRoot);
    function sync() {
    }
    exports_1("sync", sync);
    var observable_1, local_storage_1, _data, rootId, SyncType, StoreObject, StoreField;
    return {
        setters: [
            function (observable_1_1) {
                observable_1 = observable_1_1;
            },
            function (local_storage_1_1) {
                local_storage_1 = local_storage_1_1;
            }
        ],
        execute: function () {
            _data = am.store.data;
            rootId = "am.root";
            (function (SyncType) {
                SyncType[SyncType["memory"] = 1] = "memory";
                SyncType[SyncType["local"] = 2] = "local";
                SyncType[SyncType["cloud"] = 3] = "cloud";
            })(SyncType || (SyncType = {}));
            exports_1("SyncType", SyncType);
            StoreObject = (function (_super) {
                __extends(StoreObject, _super);
                function StoreObject() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.syncType = SyncType.local;
                    return _this;
                }
                return StoreObject;
            }(observable_1.Observable));
            exports_1("StoreObject", StoreObject);
            StoreField = (function (_super) {
                __extends(StoreField, _super);
                function StoreField() {
                    var _this = _super.call(this) || this;
                    var self = _this;
                    var value;
                    Object.defineProperty(self, 'value', {
                        get: function () {
                            return value;
                        },
                        set: function (newValue) {
                            if (value !== newValue) {
                                value = newValue;
                                self.onChange({
                                    newValue: newValue,
                                    oldValue: value,
                                    propertyName: 'value'
                                });
                            }
                        },
                        enumerable: true
                    });
                    return _this;
                }
                return StoreField;
            }(StoreObject));
            exports_1("StoreField", StoreField);
        }
    };
});
//# sourceMappingURL=store.js.map