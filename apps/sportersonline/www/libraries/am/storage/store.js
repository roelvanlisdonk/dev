System.register(["../common/observable", "./local.storage"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getObjectFromLocalStorage(id) {
        if (!id) {
            throw new Error("Please provide id.");
        }
        var json = local_storage_1.clientStorage.getItem(id);
        return JSON.parse(json);
    }
    function getRoot() {
        var root = _data[rootId];
        if (root) {
            return root;
        }
        root = getObjectFromLocalStorage(rootId);
        if (root) {
            _data[rootId] = root;
            return root;
        }
        return null;
    }
    exports_1("getRoot", getRoot);
    function setRoot(root) {
        _data[rootId] = root;
    }
    exports_1("setRoot", setRoot);
    function save(storeObject) {
        observable_1.notify(storeObject);
    }
    exports_1("save", save);
    var observable_1, local_storage_1, _data, rootId, SyncType;
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
        }
    };
});
//# sourceMappingURL=store.js.map