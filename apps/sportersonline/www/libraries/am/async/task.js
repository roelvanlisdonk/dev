System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function after(task, fn) {
        task.after = task.after || [];
        task.after.push(fn);
        if (task.done) {
            var total = task.after.length;
            for (var i = 0; i < total; i++) {
                var after_1 = task.after[i];
                after_1(task.error, task.data, task.state);
            }
        }
        return task;
    }
    exports_1("after", after);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=task.js.map