
interface ISpecInfo {
    input: any;
    it: (...inputs: any[]) => any | null;
    result: any;
    subject: any;
}

export interface ISpecResult {
    give: (...inputs: any[]) => any;
}

export function spec(title?: string): ISpecResult {
    const specInfo: ISpecInfo = {
        input: null,
        it: null,
        result: null,
        subject: null
    };

    function given(input: any): any {
        
    }

    function it(subject: (...inputs: any[]) => any) {
        
    }

    function shouldReturn(data: any) {

    }

    const result: ISpecResult
}



export function run() {
    console.log("Test runner started, realy.");

    window.setTimeout(logMessage, 2000);
}

function logMessage() {
  console.log("That was really slow!");
}



export interface IObservable {
    actions: Array<(x:any) => any>;
}

run();


/*

import { test } from '../test/test'


interface IMergeInput {
    a: any;
    b: any;
}


function merge(input: IMergeInput): any {

}

test("am.helpers.merge", (spec) => {
    // spec is an object containing only one function "given"
    // given will be a function expecting input for the "function under test" and will return an object containing only one function "it".
    // The function "it" expects an function as input and return an object containing multiple "assert" functions that can be extended.
    // The input for the .it function can be a normal function or a function returning an observable,
    // So we can test sync and async function.
    
    spec("Test case 1") // When empty only the "assert text will be used"
    .given(input)
    .it(merge);                                         // The input for the ".it" function, can be an async function, when it is an async function, the "should" functions, will subsribe to the observable.
    .shouldReturn({ c: "test", d: "test"});             // Assert result

    spec("Test case 2")
    .given(input)
    .it(merge);
    .shouldChangeInputTo({ c: "test", d: "test"});      // Assert input changes

    spec("Test case 2")
    .given(input)
    .it(merge);
    .shouldBe(lessThen994);                               // Custom assert. 

    

    

});

function lessThen994(result): IAssertResult {
    const assertResult: IAssertResult = {
        errorMessage: "Expected result to be less then 994, but was [4545].",
        succesMessage: "Result was less then 994",
        value: result result < 994 // result should be  "994"
    };
    return assertResult;
}






*/