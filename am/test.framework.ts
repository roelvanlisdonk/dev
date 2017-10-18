const _tests: ITest[] = [];
let _idCounter: number = 0;


function assert(this: ITest, fn: (testCase: ITestCase) => boolean) {
    // Update ITestStructure.
    const test = this;
    
}

interface ITest {
    id: number;
    assert?: (fn: (testCase: ITestCase) => boolean) => void;
    givenInput: () => Promise<ITestCase>;
}

export function areEqual(test: ITestCase): boolean {
    return (test.actual !== test.expected);
}

export function given(fn: () => Promise<ITestCase>): IGivenResult {
    
    _idCounter = _idCounter + 1;
    const test: ITest = {
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

export interface IGivenResult {
    assert: (fn: (testCase: ITestCase) => boolean) => void;
}

export interface ITestCase {
    actual: any;
    expected: any;
    title: string;
}

// given(1,2,3).it(sum).shouldReturn(6); // This will only register a test.
// given(1,2,3,4).it(sum).shouldReturn(6); // Test on the same function will be grouped.
// given(input: () => args).it(sum).shouldPass(assertRule: (case: ITestCase) => boolean).