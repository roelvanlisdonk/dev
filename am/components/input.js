"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require(".././store");
function input(field) {
    const node = {
        events: [{ name: "input", listener: onInputChange, useCapture: false }],
        name: "input"
    };
    function onInputChange(e) {
        field.value = e.data;
        store_1.saveField(field);
    }
    return node;
}
exports.input = input;
//# sourceMappingURL=input.js.map