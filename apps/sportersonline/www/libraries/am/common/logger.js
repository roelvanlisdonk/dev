System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function error(message) {
        log.error(message);
    }
    function info(message) {
        logMessage(message);
    }
    function warn(message) {
        logMessage(message);
    }
    function logMessage(message) {
        if (console) {
            console.log(message);
        }
    }
    var log;
    return {
        setters: [],
        execute: function () {
            exports_1("log", log = {
                error: error,
                info: info,
                warn: warn
            });
        }
    };
});
//# sourceMappingURL=logger.js.map