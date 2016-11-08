System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var questionsAsObject, questionsAsArray;
    function addQuestionToArray(id) {
        var question = {
            id: id.toString(),
            question: "Dit is een best wel lange vraag met wat data, The returned value represents the time elapsed since the time origin (the PerformanceTiming.navigationStart property). In a web worker, the time origin is the time that its execution context (e.g. thread or process) is created. In a window, it is the time that the user navigated (or confirmed navigation, if confirmation was needed) to the current document. Bear in mind the following point" + id.toString()
        };
        questionsAsArray.push(question);
    }
    function addQuestionToObject(id) {
        var question = {
            id: id.toString(),
            question: "Dit is een best wel lange vraag met wat data, The returned value represents the time elapsed since the time origin (the PerformanceTiming.navigationStart property). In a web worker, the time origin is the time that its execution context (e.g. thread or process) is created. In a window, it is the time that the user navigated (or confirmed navigation, if confirmation was needed) to the current document. Bear in mind the following point" + id.toString()
        };
        questionsAsObject[id] = question;
    }
    function start() {
        for (var i = 0, length_1 = 1000000; i < length_1; i++) {
            addQuestionToArray(i);
        }
        for (var i = 0, length_2 = 1000000; i < length_2; i++) {
            var question = questionsAsArray[i];
            questionsAsObject[i.toString()] = question;
        }
        var t0 = performance.now();
        for (var prop in questionsAsObject) {
            if (questionsAsObject.hasOwnProperty(prop)) {
                var question = questionsAsObject[prop];
            }
        }
        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    }
    exports_1("start", start);
    return {
        setters:[],
        execute: function() {
            questionsAsObject = {};
            questionsAsArray = [];
            start();
        }
    }
});
//# sourceMappingURL=performance.js.map