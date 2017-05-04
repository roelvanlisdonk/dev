
interface ITestCase {
    description: string;
    input: any;
    result: any;
    subject: any;
}

export interface ISpecResult {
    give: (...inputs: any[]) => any;
}

export function test(description: string, spec:(verify:any) => void): void {
    const testDescription = description;

    const testCase: ITestCase = {
        input: null,
        result: null,
        subject: null,
        testDescription: null,
        verifyDescription: null
    };

}

 function verify(description?: string): ISpecResult {
    
    

    function given(input: any): any {
        
    }

    function subject(fn: (...inputs: any[]) => any) {
        
    }

    function shouldReturn(data: any) {

    }

    return specInfo;
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

test("am.helpers.setAllPropertiesToSpecificValue", (verify) => {
    const input = {
        subject: { c: "value for c", d: "value for d"},
        value: "test"
    };

    verify("Test case 1") // When empty only the "assert text will be used"
    .given(input)
    .subject(setAllPropertiesToSpecificValue)
    .shouldReturn({ c: "test", d: "test"});

    verify("Test case 2")
    .given(input)
    .subject(setAllPropertiesToSpecificValue);
    .executesCorrectly((input, result, thisForSubject) => {
        return true; // assert changes to input, result and the "this" of the test subject.
    });      

    verify("Test case 3")
    .given(input)
    .subject(setAllPropertiesToSpecificValue);
    .changesInputTo((input, result, thisForSubject) => boolean);      // Assert input changes
});


test("am.helpers.merge", (verify) => {
    // spec is an object containing only one function "given"
    // given will be a function expecting input for the "function under test" and will return an object containing only one function "it".
    // The function "it" expects an function as input and return an object containing multiple "assert" functions that can be extended.
    // The input for the .it function can be a normal function or a function returning an observable,
    // So we can test sync and async function.
    
    // Call to spec starts a new testcase
    verify("Case 1") // When empty only the "assert text will be used"
    .given(input)
    .it(merge);                                         // The input for the ".it" function, can be an async function, when it is an async function, the "should" functions, will subsribe to the observable.
    .shouldReturn({ c: "test", d: "test"});             // Assert result

    verify("Case 2")
    .given(input)
    .it(merge);
    .shouldChangeInputTo({ c: "test", d: "test"});      // Assert input changes

    verify("Case 3")
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


/*

const eventInput: IEventInput = {
    name: "onclick"
};
  
function event(eventInput: IEventInput, obs:?: IObservable) {
    const result: IObservable = obs || am.async.createObservable();

    return result;
}


const fetchInput: IFetchInput = {
    data: {},
    url: ''
};

function fetch(fetchInput: IFetchInput, obs:?: IObservable) {
    const result: IObservable = obs || am.async.createObservable();

    return result;
}



const operator2Input: IOperator2Input = {

};
const obs = event(eventInput);
            fetch(fetchInput, obs)


- Een operator is gewoon een functie, die een observable maakt of verrijkt en een observable terug geeft.
- Een operator registreerd een onCompleted (die aangeroepen wordt bij succes) en een onError functie  (die aangeroepen wordt bij een error)
- Let op je hoeft de onError niet te gebruiken in de subscribe zit een trycatch die alle fouten afhandeld.
- letop 
- Op het moment dat de subscribe functie wordt aangeroepen gaat de gehele chain werken.
- De subscribe methode geeft een object terug met 1 functie de finally functie, deze wordt 

wat ook nog kan 

// The IObservable contains only functions (operators) and properties that should be used by the end user.
// "Internal" functions can be found in the module am.async like:
    - am.async.next(..., objs)  // triggers a next execution of the observable, when subscription is called.
    - am.async.registerSuccessHandler(..., objs)
    - am.async.registerErrorHandler(..., objs)


// In denk als we am.async.Observable.prototype.myNewOperator gebruiken dat de performance impact miniem is.

interface IObservable {
    _internal: {
        errorHandlers: [],
        successHandlers: []
    };
    state: {},
    subscribe: (()=> any) => {finally}};
}

event(clickInput)
.debounce(debounceInput)
.event(scrollInput)
.wait(waitInput)
.fetch(fetchInput)
.onError(myErrorHandler)
.finally(myFinallyHandler)                          // Will always run after the whole stream completes successfully or not.

// At this point nothig has happend yet, just the declaration of the observable, by executing the subscribe function. the observable will executed.
// Data will be the last value of "this".result, in this case it will be the data received returned from the fetch call.
.subscribe((data: any)=>{
    // Note: on each call to the "am.async.next(..., objs)" this function will fire, we subsribe to a stream of events.
}), stream);

// Execute the "observable"
// subscribe krijgt een functie mee, deze functie krijgt als parameter
 // after the subscribe function is called, the whole observable chain will be executed.
 // myFetchResultHandler will only be called, when the whole stream completes succesfully.



////////////////////////////////// Passing state down the chain:

const obs = am.async.createObservable();
obs.state = {}; // this way we can pass state down the whole chain.
obs
.event(eventInput)
.debounce(debounceInput)
.wait(waitInput)
.fetch(fetchInput)
.onError(myErrorHandler)
.finally(myFinallyHandler)
.subscribe(myFetchResultHandler, stream);


   
    

    .
Inside an operator this = Observable with 3 functions onError, onCompleted. onNext
- onError should be passed function, this function should be called when an error occurs
- onCompleted should be passed an function, this function should be called when the operator successfully completes.
- onNext // don't no if we need this
each operator operates on 2 parameters (input and state), 
- state will be passed from operator function to operator function
- input will only be passed to the current operator
- input is directly given to the operator or given by the previous operator





var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    onNext || (onNext = noop);                  // de functie die uitgevoerd moet worden
    onError || (onError = defaultError);        // functie die aangeroepen wordt wanneer er een fout optreedt
    onCompleted || (onCompleted = noop);        // Functie die aangeroepen wordt wanneer het goed gaat.
    return new AnonymousObserver(onNext, onError, onCompleted);
  };





*/



