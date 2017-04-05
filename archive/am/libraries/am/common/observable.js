System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable;
    return {
        setters: [],
        execute: function () {
            Observable = (function () {
                function Observable() {
                    this.deps = [];
                    var self = this;
                    var onChangeHandlers = [];
                    function onChange(evt) {
                        var handlersCount = onChangeHandlers.length;
                        for (var i = 0, length_1 = handlersCount; i < length_1; i++) {
                            var handler = onChangeHandlers[i];
                            handler(evt);
                        }
                    }
                    Object.defineProperty(self, 'onChange', {
                        get: function () {
                            return onChange;
                        },
                        set: function (handler) {
                            onChangeHandlers.push(handler);
                        },
                        enumerable: true
                    });
                }
                return Observable;
            }());
            exports_1("Observable", Observable);
        }
    };
});
//# sourceMappingURL=observable.js.map