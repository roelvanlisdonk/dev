System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function startsWith(text, searchString, position) {
        if (!text) {
            return false;
        }
        position = position || 0;
        return text.substr(position, searchString.length) === searchString;
    }
    exports_1("startsWith", startsWith);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=starts.with.js.map