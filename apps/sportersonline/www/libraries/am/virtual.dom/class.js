System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function createClass(name) {
        var styles = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            styles[_i - 1] = arguments[_i];
        }
        if (!name) {
            throw new Error("Please provide name.");
        }
        if (!styles || !styles.length) {
            throw new Error("Please provide styles.");
        }
        var mergedStyles = {};
        var total = styles.length;
        for (var i = 0; i < total; i++) {
            var style = styles[i];
            mergedStyles = Object.assign(mergedStyles, style);
        }
        return {
            name: name,
            selector: "." + name,
            style: mergedStyles
        };
    }
    exports_1("createClass", createClass);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=class.js.map