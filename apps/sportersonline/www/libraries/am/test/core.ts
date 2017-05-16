
function myCoolNewFn() {
    
}

function run() {
    console.log("Dit is een test");
}

run();



/**
 *  TODO: use AM rendering instead of direct DOM manupilation.
 */
function renderToDom(testcase: ITestcase): void {
    const element = document.querySelector(renderer.selector);

}

/**
 * Can be set to any rendering function so, test framework can be used in the browser and node.
 * By default is set to browser rendering.
 * In the future it wil return an observable.
 */
export let renderer: IRenderer = {
    render: renderToDom,
    selector: "body"
};


export interface IRenderer {
    render: (testcase: ITestcase) => void;
    selector?: string; // Only used for dom rendering.
}

export interface ITest {
    rendered?: boolean;
    subject: string;
    testcases?: Array<ITestcase>;
}

export interface ITestcase {
    actual: any;
    expected: any;
    result?: boolean;
    test: ITest;
    title?: string;
}

/**
 * Show the results of asserting a given testcase to the user.
 */
export function assert(testcase: ITestcase, check?: (testcase:ITestcase) => boolean) {
    if(!check) {
        check = isEqualTo;
    }
    testcase.result = check(testcase);
    renderer.render(testcase);
}

export function isEqualTo(testcase:ITestcase): boolean {

    return true;
}

/*

import { test } from '../test/core'

const test: ITest = {
    subject: "am.helpers.setAllPropertiesToSpecificValue"
};

const testcase1: ITestcase = {
    actual: setAllPropertiesToSpecificValue("some input"),
    expected: "some input"
    test: test
};
assert(testcase1); // By default checks if actual is equal to expected == assert(testcase1, isEqualTo); 
assert(testcase1, someFunction(testcase:ITestcase):boolean { return true; }); e.g.
assert(testcase1, isGreaterThen(testcase:ITestcase):boolean { return true; }); // check if actual is greater then expected.
assert(testcase1, isLessThen(testcase:ITestcase):boolean { return true; }); // check if actual is greater then expected.


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




// Asserts are sync, but 

- assert has a this with a property title === test.title
- assert can be used inside async observable tasks
- helper function can be used to do the assertion.
- assert only except the second parameter to be a function that returns true or false.
- test result can be async rendered to the screen.
test("am.helpers.setAllPropertiesToSpecificValue", (assert) => {
    
    let c
    const task = GetData();
    task.subscribe((data)=>{
        assert("Test case 1", () => {
            return data === expected;
        });
    });
    
    
    let actual = 200;
    let expected = 300;
    assert("Test case 2", () => { return actual === expected; });

    actu
    assert("Test case 3", () => { return actual === expected; });
    assert("Test case 4", () => { return actual === expected; });
    assert("Test case 5", () => { return actual === expected; });

});


*/



