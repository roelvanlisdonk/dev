let _idCounter: number = 0;
let _tests: ITest[] = [];

export function beEqualTo(actual: any, expected: any) {
    return actual === expected;
}

export function execute() {
    for(let i = 0, length = _tests.length;i < length;i++) {
        executeTest(_tests[i]);
    }

    _tests = _tests.sort(byResult);

    for(let i = 0, length = _tests.length;i < length;i++) {
        showTestResult(_tests[i]);
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
    actual?: any;
    assert?: (this: ITest, actual: any, expected: any) => boolean;
    id: number;
    input: any[];
    result?: boolean;
    subject?: (...args: any[]) => any;
    expected?: any;
}

function byResult(a:ITest, b:ITest): number {
    if(a.result === b.result) {
        return 0;
    }

    // Failure tests should be at the bottom.
    if(a.result === false && b.result === true){
        return 1;
    }
    
    // Success tests should be on top.
    if(a.result === true && b.result === false){
        return -1;
    }
}

function executeTest(test: ITest) {
    const inputAsString = JSON.stringify(test.input);
    const expectedAsString = JSON.stringify(test.expected);
    const subject = test.subject;
    const assert = test.assert;
    test.actual = subject.apply(null, test.input);
    const actualAsString = JSON.stringify(test.actual);
    
    test.result = test.assert.apply(test, [actualAsString, expectedAsString]);
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

function showTestResult(test: ITest): void {
    const inputAsString = JSON.stringify(test.input);
    const expectedAsString = JSON.stringify(test.expected);
    const subject = test.subject;
    const assert = test.assert;
    const actualAsString = JSON.stringify(test.actual);

    if(test.result) {
        console.log(`Success: Given input ${inputAsString} it [${subject.name}] should [${assert.name}] expected [${expectedAsString}].`)
    }
    else {
        console.log(`Failure: Given input ${inputAsString} it [${subject.name}] should [${assert.name}] expected [${expectedAsString}], but was [${actual}].`)
    }
}
