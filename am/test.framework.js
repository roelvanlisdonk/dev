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
    const input = JSON.stringify(test.input);
    const expected = JSON.stringify(test.expected);
    const subject = test.subject;
    const assert = test.assert;
    const actual = subject.apply(null, input);
    const assertResult = test.assert.apply(test, [actual, expected]);
    if (assertResult) {
        console.log(`Success: Given input [${input}], it [${subject.name}] should [${assert.name}] expected [${expected}].`);
    }
    else {
        console.log(`Failure: Given input [${input}] it [${subject.name}] should [${assert.name}] expected [${expected}], but was [${actual}].`);
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
function sum(...args) {
    let result = 0;
    for (let i = 0, length = args.length; i < length; i++) {
        result = result + args[i];
    }
    return result;
}
// Examples:
// given(1,2,3).it(sum).shouldReturn(6); // This will only register a test.
// given(1,2,3,4).it(sum).shouldReturn(6); // Test on the same function will be grouped.
// given(input: () => args).it(sum).should(assertRule: (input: [], expected: value) => boolean, expected: value | fn).
// given(1,2,3,4).it(sum).should(beGreatherThen, 6); // Test on the same function will be grouped.
// given(1,2,3,4).it(sum).should(beGreatherThen, ()=> { return 6;}); // Test on the same function will be grouped.
// given(1,2,3,4).it(sum).should(setCorrectProperties, { name: '', value: 6}); // Test on the same function will be grouped.
//given(1,2,3,4).it(sum).should(beEqualTo, 6); // Test on the same function will be grouped.
given(1, 2, 3, 4).it(sum).should(beEqualTo, 6);
execute();
//# sourceMappingURL=test.framework.js.map