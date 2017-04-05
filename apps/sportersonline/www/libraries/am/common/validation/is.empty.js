System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isEmpty(value) {
        return (value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length <= 0));
    }
    exports_1("isEmpty", isEmpty);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=is.empty.js.map