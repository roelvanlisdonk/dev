System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function button() {
    }
    exports_1("button", button);
    var defaultButtonOptions, ButtonOptions;
    return {
        setters: [],
        execute: function () {
            exports_1("defaultButtonOptions", defaultButtonOptions = new ButtonOptions());
            ButtonOptions = (function () {
                function ButtonOptions() {
                }
                return ButtonOptions;
            }());
            exports_1("ButtonOptions", ButtonOptions);
        }
    };
});
//# sourceMappingURL=button.js.map