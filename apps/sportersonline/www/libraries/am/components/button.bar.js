System.register(["./styles"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function buttonBar() {
        var node = {
            classes: [styles_1.container],
            name: tagName
        };
        return node;
    }
    exports_1("buttonBar", buttonBar);
    var styles_1, tagName;
    return {
        setters: [
            function (styles_1_1) {
                styles_1 = styles_1_1;
            }
        ],
        execute: function () {
            tagName = "button-bar";
        }
    };
});
//# sourceMappingURL=button.bar.js.map