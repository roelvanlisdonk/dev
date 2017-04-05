System.register(["../virtual.dom/class"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var class_1, defaultBackgroundColor, defaultColor, defaultFontFamily, container;
    return {
        setters: [
            function (class_1_1) {
                class_1 = class_1_1;
            }
        ],
        execute: function () {
            exports_1("defaultBackgroundColor", defaultBackgroundColor = "#FFFFFF");
            exports_1("defaultColor", defaultColor = "#8F8E93");
            exports_1("defaultFontFamily", defaultFontFamily = "Helvetica, Arial, sans-serif");
            exports_1("container", container = class_1.createClass("container", {
                backgroundColor: defaultBackgroundColor,
                borderWidth: "0",
                boxSizing: "border-box",
                color: defaultColor,
                display: "block",
                fontFamily: defaultFontFamily,
                margin: "0",
                outlineWidth: "0",
                padding: "0"
            }));
        }
    };
});
//# sourceMappingURL=styles.js.map