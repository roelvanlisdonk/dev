import { addClassToStyleSheet } from "../platform/dom/stylesheet";
import { IClass } from "../virtual.dom/class";
/**
 *  TODO: use AM rendering instead of direct DOM manupilation.
 *  TODO: data los koppelen van UI
 *  TODO: ui output onderbrengen in DOM renderer, inclusief kleuren etc.
 *  TODO: lazy render, render testrun, pas bij eerste assert zodat renderer ingesteld kan worden.
 */

const _failureColor = "#640000";
const _successColor = "#006400";

let _renderer: IRenderer = createDomRenderer();
renderRunToDom();

function createDomRenderer(): IDomRenderer {
    const run: IDomRun = {
        assertCount: 0,
        assertFailCount: 0,
        assertSuccesCount: 0,
        output: {
            container: null,
            summary: null
       },
        testCount: 0
    };

    const renderer: IDomRenderer = {
        render: renderTestcaseToDom,
        selector: "body",
        run: run
    };

    return renderer;
}

export function setRenderer(renderer: IRenderer) {
    _renderer = renderer;
}

function renderTestToDom(test: IDomTest, run: IDomRun): void {
    if(test.output){ return; }

    const subjectClass: IClass = {
        name: "subject",
        style: {
            padding: "10px 20px 5px 20px"
        }
    };
    addClassToStyleSheet(subjectClass);
    const subject = document.createElement("div"); 
    subject.textContent = test.subject;
    subject.classList.add(subjectClass.name);

    const container = document.createElement("div");    
    container.appendChild(subject);
    test.output = container;
    run.output.container.appendChild(container);

    run.testCount += 1;
}

function renderRunToDom(): void {
    const renderer = <IDomRenderer>_renderer;
    const run = renderer.run;
    const output = run.output;

    const summaryClass: IClass = {
        name: "summary",
        style: {
            backgroundColor: _successColor,
            color: "#ffffff",
            padding: "10px 20px 10px 20px"
        }
    };
    addClassToStyleSheet(summaryClass);
    const summary = document.createElement("div");
    summary.classList.add(summaryClass.name);
    output.summary = summary;

    const container = document.createElement("div");
    container.appendChild(summary);
    output.container = container;
    
    const element = <HTMLElement>document.querySelector(renderer.selector);
    element.appendChild(container);
}

function renderTestcaseToDom(testcase: IDomCase): void {
    const renderer = _renderer;
    const run = renderer.run;

    renderTestToDom(testcase.test, renderer.run);

    const success = testcase.result.value;
    const color = success ? _successColor : _failureColor;
    const messageClass: IClass = {
        name: "message",
        style: {
            color: color,
            padding: "0 20px 0 40px"
        }
    };
    addClassToStyleSheet(messageClass);
    const message = document.createElement("div");
    message.classList.add(messageClass.name);
    const checkMessage = success ? testcase.result.successMessage : testcase.result.errorMessage;
    const correctedTitle =  Boolean(testcase.title) ? `${testcase.title} - ` : "";
    const messageText = `${correctedTitle}${checkMessage}`;
    message.textContent = messageText;

    const container = document.createElement("div");
    container.appendChild(message);
    testcase.test.output.appendChild(container);
    
    run.assertCount += 1;
    if(success) {
        run.assertSuccesCount += 1;
    } else {
        run.assertFailCount += 1;
    }

    updateDomRun();
}

function updateDomRun() {
    const renderer = <IDomRenderer>_renderer;
    const run = renderer.run;
    run.output.summary.textContent = `${run.testCount} tests, ${run.assertCount} asserts, ${run.assertFailCount} failed`;
}

/**
 * Show the results of asserting a given testcase to the user.
 */
export function assert(testcase: ICase, check?: (testcase:ICase) => ICaseResult) {
    const test = testcase.test;

    if(!check) {
        check = isEqualTo;
    }
    testcase.result = check(testcase);
    _renderer.render(testcase);
}

export function isEqualTo(testcase:ICase): ICaseResult {
    const result: ICaseResult = {
        errorMessage: `${testcase.actual} is not equal to ${testcase.expected}`,
        successMessage: `${testcase.actual} is equal to ${testcase.expected}`,
        value: (testcase.expected === testcase.actual)
    };
    return result;
}

export interface ICase {
    actual: any;
    expected: any;
    result?: ICaseResult;
    test: IDomTest;
    title?: string;
}

export interface ICaseResult {
    errorMessage: string;
    successMessage: string;
    value: boolean;
}

export interface IDomCase extends ICase {
    test: IDomTest;
}

export interface IDomRenderer extends IRenderer {
    render: (testcase: IDomCase) => void;
    selector: string;
    run: IDomRun;
}

export interface IDomTest extends ITest {
    output?: HTMLDivElement;
    run?: IDomRun;
}

export interface IDomRun extends IRun {
    output: IDomRunOutput;
}

export interface IDomRunOutput {
    container: HTMLDivElement;
    summary: HTMLDivElement;
}

export interface IRenderer {
    render: (testcase: ICase) => void;
    run: IRun;
}

export interface IRun {
    assertCount: number;
    assertFailCount: number;
    assertSuccesCount: number;
    output: any;
    testCount: number;
}

export interface ITest {
    output?: any;
    subject: string;
}















/**
 * Test example
 */

function myCoolNewFn(input: number): number {
    if(input === 300) {
        return 200;
    }

    if(input === 500) {
        return 400;
    }

    return 100;
}

const test: ITest = {
    subject: "myCoolNewFn"
};

const case1: ICase = {
    actual: myCoolNewFn(1),
    expected: 100,
    test: test
};
assert(case1);

const case2: ICase = {
    actual: myCoolNewFn(300),
    expected: 200,
    test: test
};
assert(case2);