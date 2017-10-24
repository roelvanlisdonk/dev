const _tests: ITest[] = [];
let _idCounter: number = 0;


export function beEqualTo(actual: any, expected: any) {
    return actual === expected;
}

export function execute() {
    for(let i = 0, length = _tests.length;i < length;i++) {
        executeTest(_tests[i]);
    }
}

export function given(...input: any[]): IGivenResult {
    
    // Create new test object.
    _idCounter = _idCounter + 1;
    const test: ITest = {
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

export interface IGivenResult {
    it: (this: IGivenResult, fn: (...args: any[]) => any) => IItResult;
}

export interface IItResult {
    should: (this: IItResult, assertFn:(actual: any, expected: any) => boolean, expected: any) => void;
}


// Each test will be stored as an ITest object.
// It will be kept private, to guide developers when using the fluent interface, choosing the correct functions.
interface ITest extends IGivenResult, IItResult {
    assert?: (this: ITest, actual: any, expected: any) => boolean;
    id: number;
    input: any[];
    subject?: (...args: any[]) => any;
    expected?: any;
}

function executeTest(test: ITest) {
    const input = JSON.stringify(test.input);
    const expected = JSON.stringify(test.expected);
    const subject = test.subject;
    const assert = test.assert;

    const actual = subject.apply(null, input);
    const assertResult = test.assert.apply(test, [actual, expected]);
    if(assertResult) {
        console.log(`Success: Given input [${input}], it [${subject.name}] should [${assert.name}] expected [${expected}].`)
    }
    else {
        console.log(`Failure: Given input [${input}] it [${subject.name}] should [${assert.name}] expected [${expected}], but was [${actual}].`)
    }
}

function it(this: IGivenResult, fn: (...args: any[]) => any): IItResult {
    const self: ITest = <any>this;
    self.subject = fn;
    return <IItResult><any>self;
}

function should(this: ITest, fn:(this: ITest, actual: any, expected: any) => boolean, expected: any): void {
    const self: ITest = this;
    self.assert = fn;
    self.expected = expected;
    _tests.push(self);
}

function sum(...args: number[]): number {
    let result = 0;
    for(let i=0, length = args.length;i<length;i++) {
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
given(1,2,3,4).it(sum).should(beEqualTo, 6);
execute();

