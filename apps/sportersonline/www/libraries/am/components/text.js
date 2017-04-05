System.register(["../common/resource", "../common/validation/is.string"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function text(input) {
        if (!input) {
            throw new Error("Please provide input.");
        }
        var node = {
            name: null,
            text: null
        };
        if (is_string_1.isString(input)) {
            node.text = input;
            return node;
        }
        if (input.value !== undefined) {
            node.text = String(input.value);
            return node;
        }
        node.text = resource_1.getResourceValue(input);
        return node;
    }
    exports_1("text", text);
    var resource_1, is_string_1;
    return {
        setters: [
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (is_string_1_1) {
                is_string_1 = is_string_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=text.js.map