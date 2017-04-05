System.register(["./array/remove", "./validation/is.object"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function addListener(observable, listener, traverse) {
        if (traverse === void 0) { traverse = Traverse.no; }
        if (!observable) {
            throw new Error("Please provide observable.");
        }
        if (!listener) {
            throw new Error("Please provide listener.");
        }
        if (traverse === Traverse.full || traverse === Traverse.shallow) {
            var keys = Object.keys(observable);
            var keyCount = keys.length;
            for (var i = 0; i < keyCount; i++) {
                var key = keys[i];
                var item = observable[key];
                if (item._listeners) {
                    item._listeners.push(listener);
                }
                if (traverse === Traverse.full) {
                    addListener(item, listener, traverse);
                }
            }
        }
        if (observable._listeners) {
            observable._listeners.push(listener);
        }
    }
    exports_1("addListener", addListener);
    function isObservable(input) {
        return is_object_1.isObject(input) && Boolean(input._listeners);
    }
    exports_1("isObservable", isObservable);
    function not(observable) {
        return { not: observable };
    }
    exports_1("not", not);
    function notify(observable) {
        if (!observable) {
            throw new Error("Please provide observable.");
        }
        if (!observable._listeners) {
            throw new Error("Please provide observable._listeners.");
        }
        var listeners = observable._listeners.slice();
        if (!listeners) {
            return;
        }
        var total = listeners.length;
        for (var i = 0; i < total; i++) {
            var listener = listeners[i];
            var evt = {
                listener: listener,
                source: observable
            };
            listener.fn(evt);
        }
    }
    exports_1("notify", notify);
    function removeListener(observable, listener, traverse) {
        if (traverse === void 0) { traverse = Traverse.no; }
        if (!observable) {
            throw new Error("Please provide observable.");
        }
        if (!listener) {
            throw new Error("Please provide listener.");
        }
        if (Traverse.full || Traverse.shallow) {
            var keys = Object.keys(observable);
            var keyCount = keys.length;
            for (var i = 0; i < keyCount; i++) {
                var key = keys[i];
                var item = observable[key];
                if (item._listeners) {
                    remove_1.remove(item._listeners, listener);
                }
                if (Traverse.full) {
                    removeListener(item, listener, traverse);
                }
            }
        }
        if (observable._listeners) {
            remove_1.remove(observable._listeners, listener);
        }
    }
    exports_1("removeListener", removeListener);
    var remove_1, is_object_1, Traverse;
    return {
        setters: [
            function (remove_1_1) {
                remove_1 = remove_1_1;
            },
            function (is_object_1_1) {
                is_object_1 = is_object_1_1;
            }
        ],
        execute: function () {
            (function (Traverse) {
                Traverse[Traverse["no"] = 0] = "no";
                Traverse[Traverse["shallow"] = 1] = "shallow";
                Traverse[Traverse["full"] = 2] = "full";
            })(Traverse || (Traverse = {}));
            exports_1("Traverse", Traverse);
        }
    };
});
//# sourceMappingURL=observable.js.map