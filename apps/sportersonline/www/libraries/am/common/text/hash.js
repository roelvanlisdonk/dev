System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function hash(str) {
        if (!str) {
            throw new Error("Please provide str.");
        }
        var hash = 5381;
        var i = str.length;
        while (i) {
            hash = (hash * 33) ^ str.charCodeAt(--i);
        }
        return hash >>> 0;
    }
    exports_1("hash", hash);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=hash.js.map