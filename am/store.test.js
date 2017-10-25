"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_framework_1 = require("./test.framework");
function sum(...args) {
    let result = 0;
    for (let i = 0, length = args.length; i < length; i++) {
        result = result + args[i];
    }
    return result;
}
// Examples:
test_framework_1.given(1, 2, 3, 4).it(sum).should(test_framework_1.beEqualTo, 10);
//# sourceMappingURL=store.test.js.map