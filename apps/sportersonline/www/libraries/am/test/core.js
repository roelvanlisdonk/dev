System.register(["../platform/dom/stylesheet"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function createDomRenderer() {
        var run = {
            assertCount: 0,
            assertFailCount: 0,
            assertSuccesCount: 0,
            output: {
                container: null,
                summary: null
            },
            testCount: 0
        };
        var renderer = {
            render: renderTestcaseToDom,
            selector: "body",
            run: run
        };
        return renderer;
    }
    function setRenderer(renderer) {
        _renderer = renderer;
    }
    exports_1("setRenderer", setRenderer);
    function renderTestToDom(test, run) {
        if (test.output) {
            return;
        }
        var subjectClass = {
            name: "subject",
            style: {
                padding: "10px 20px 5px 20px"
            }
        };
        stylesheet_1.addClassToStyleSheet(subjectClass);
        var subject = document.createElement("div");
        subject.textContent = test.subject;
        subject.classList.add(subjectClass.name);
        var container = document.createElement("div");
        container.appendChild(subject);
        test.output = container;
        run.output.container.appendChild(container);
        run.testCount += 1;
    }
    function renderRunToDom() {
        var renderer = _renderer;
        var run = renderer.run;
        var output = run.output;
        var summaryClass = {
            name: "summary",
            style: {
                backgroundColor: _successColor,
                color: "#ffffff",
                padding: "10px 20px 10px 20px"
            }
        };
        stylesheet_1.addClassToStyleSheet(summaryClass);
        var summary = document.createElement("div");
        summary.classList.add(summaryClass.name);
        output.summary = summary;
        var container = document.createElement("div");
        container.appendChild(summary);
        output.container = container;
        var element = document.querySelector(renderer.selector);
        element.appendChild(container);
    }
    function renderTestcaseToDom(testcase) {
        var renderer = _renderer;
        var run = renderer.run;
        renderTestToDom(testcase.test, renderer.run);
        var success = testcase.result.value;
        var color = success ? _successColor : _failureColor;
        var messageClass = {
            name: "message",
            style: {
                color: color,
                padding: "0 20px 0 40px"
            }
        };
        stylesheet_1.addClassToStyleSheet(messageClass);
        var message = document.createElement("div");
        message.classList.add(messageClass.name);
        var checkMessage = success ? testcase.result.successMessage : testcase.result.errorMessage;
        var correctedTitle = Boolean(testcase.title) ? testcase.title + " - " : "";
        var messageText = "" + correctedTitle + checkMessage;
        message.textContent = messageText;
        var container = document.createElement("div");
        container.appendChild(message);
        testcase.test.output.appendChild(container);
        run.assertCount += 1;
        if (success) {
            run.assertSuccesCount += 1;
        }
        else {
            run.assertFailCount += 1;
        }
        updateDomRun();
    }
    function updateDomRun() {
        var renderer = _renderer;
        var run = renderer.run;
        run.output.summary.textContent = run.testCount + " tests, " + run.assertCount + " asserts, " + run.assertFailCount + " failed";
    }
    function assert(testcase, check) {
        var test = testcase.test;
        if (!check) {
            check = isEqualTo;
        }
        testcase.result = check(testcase);
        _renderer.render(testcase);
    }
    exports_1("assert", assert);
    function isEqualTo(testcase) {
        var result = {
            errorMessage: testcase.actual + " is not equal to " + testcase.expected,
            successMessage: testcase.actual + " is equal to " + testcase.expected,
            value: (testcase.expected === testcase.actual)
        };
        return result;
    }
    exports_1("isEqualTo", isEqualTo);
    function myCoolNewFn(input) {
        if (input === 300) {
            return 200;
        }
        if (input === 500) {
            return 400;
        }
        return 100;
    }
    var stylesheet_1, _failureColor, _successColor, _renderer, test, case1, case2;
    return {
        setters: [
            function (stylesheet_1_1) {
                stylesheet_1 = stylesheet_1_1;
            }
        ],
        execute: function () {
            _failureColor = "#640000";
            _successColor = "#006400";
            _renderer = createDomRenderer();
            renderRunToDom();
            test = {
                subject: "myCoolNewFn"
            };
            case1 = {
                actual: myCoolNewFn(1),
                expected: 100,
                test: test
            };
            assert(case1);
            case2 = {
                actual: myCoolNewFn(300),
                expected: 200,
                test: test
            };
            assert(case2);
        }
    };
});
//# sourceMappingURL=core.js.map