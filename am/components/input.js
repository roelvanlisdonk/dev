"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store = require(".././store");
function input(field) {
    const node = {
        events: {
            "input": {
                listener: onInputChange,
                useCapture: false
            }
        }
    };
    function onInputChange(e) {
        field.value = e.data;
        store.saveField(field);
    }
    return node;
}
exports.input = input;
//# sourceMappingURL=input.js.map