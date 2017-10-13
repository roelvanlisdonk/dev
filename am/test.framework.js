"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests = [];
let _idCounter = 0;
function assert(fn) {
    // Update ITestStructure.
    const test = this;
}
function given(fn) {
    _idCounter = _idCounter + 1;
    const test = {
        id: _idCounter,
        givenInput: fn
    };
    test.assert = assert.bind(test);
    const result = {
        assert: assert,
        id: _idCounter
    };
    result.assert = assert.bind(result);
    return result;
}
exports.given = given;
function areEqual(test) {
    return (test.actual !== test.expected);
}
exports.areEqual = areEqual;
//# sourceMappingURL=test.framework.js.map