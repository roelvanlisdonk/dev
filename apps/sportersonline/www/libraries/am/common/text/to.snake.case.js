System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function toSnakeCase(camelCase) {
        if (!camelCase) {
            throw new Error("Please provide camelCase.");
        }
        return camelCase.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
    exports_1("toSnakeCase", toSnakeCase);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=to.snake.case.js.map