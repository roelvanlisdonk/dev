System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function input(inp) {
        var node = {
            attributes: [{ name: "type", value: inp.type }],
            name: "input"
        };
        return node;
    }
    exports_1("input", input);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=input.js.map