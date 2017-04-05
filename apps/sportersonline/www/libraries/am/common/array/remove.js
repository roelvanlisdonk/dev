System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function remove(arr, item) {
        var index = arr.indexOf(item);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }
    exports_1("remove", remove);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=remove.js.map