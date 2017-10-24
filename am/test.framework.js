"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests = [];
let _idCounter = 0;
function beEqualTo(actual, expected) {
    return actual === expected;
}
exports.beEqualTo = beEqualTo;
function execute() {
    for (let i = 0, length = _tests.length; i < length; i++) {
        executeTest(_tests[i]);
    }
}
exports.execute = execute;
function given(...input) {
    // Create new test object.
    _idCounter = _idCounter + 1;
    const test = {
        id: _idCounter,
        input: input,
        it: it,
        should: should
    };
    // Make "this" work.
    test.it = it.bind(test);
    test.should = should.bind(test);
    return test;
}
exports.given = given;
function executeTest(test) {
    const inputAsString = JSON.stringify(test.input);
    const expectedAsString = JSON.stringify(test.expected);
    const subject = test.subject;
    const assert = test.assert;
    const actual = subject.apply(null, test.input);
    const actualAsString = JSON.stringify(actual);
    const assertResult = test.assert.apply(test, [actualAsString, expectedAsString]);
    if (assertResult) {
        console.log(`Success: Given input [${inputAsString}], it [${subject.name}] should [${assert.name}] expected [${expectedAsString}].`);
    }
    else {
        console.log(`Failure: Given input [${inputAsString}] it [${subject.name}] should [${assert.name}] expected [${expectedAsString}], but was [${actual}].`);
    }
}
function it(fn) {
    const self = this;
    self.subject = fn;
    return self;
}
function should(fn, expected) {
    const self = this;
    self.assert = fn;
    self.expected = expected;
    _tests.push(self);
}
//# sourceMappingURL=test.framework.js.map