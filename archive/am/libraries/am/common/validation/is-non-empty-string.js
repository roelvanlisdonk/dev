System.register(["./is-string"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isNonEmptyString(value) {
        return is_string_1.isString(value) && value.length > 0;
    }
    exports_1("isNonEmptyString", isNonEmptyString);
    var is_string_1;
    return {
        setters: [
            function (is_string_1_1) {
                is_string_1 = is_string_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=is-non-empty-string.js.map