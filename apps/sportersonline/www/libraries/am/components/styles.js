System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaultBackgroundColor, defaultColor, defaultFontFamily, container;
    return {
        setters: [],
        execute: function () {
            exports_1("defaultBackgroundColor", defaultBackgroundColor = "#FFFFFF");
            exports_1("defaultColor", defaultColor = "#8F8E93");
            exports_1("defaultFontFamily", defaultFontFamily = "Helvetica, Arial, sans-serif");
            exports_1("container", container = {
                name: "container",
                style: {
                    backgroundColor: defaultBackgroundColor,
                    borderWidth: "0",
                    boxSizing: "border-box",
                    color: defaultColor,
                    display: "block",
                    fontFamily: defaultFontFamily,
                    margin: "0",
                    outlineWidth: "0",
                    padding: "0"
                }
            });
        }
    };
});
//# sourceMappingURL=styles.js.map