System.register(["../../virtual.dom/class", "../../components/styles"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function path(input) {
        var node = {
            attributes: [{ name: "d", value: input.pathD }],
            name: "path"
        };
        return node;
    }
    function icon(input) {
        if (!input) {
            throw new Error("Please provide name.");
        }
        var mergedOptions = Object.assign({}, defaultInput, input);
        var node = {
            attributes: [
                { name: "width", value: "" + mergedOptions.width },
                { name: "height", value: "" + mergedOptions.height },
                { name: "viewBox", value: "0 0 " + mergedOptions.width + " " + mergedOptions.height }
            ],
            classes: [iconClass],
            name: "svg",
            nodes: [path(mergedOptions)]
        };
        return node;
    }
    exports_1("icon", icon);
    var class_1, styles_1, tagName, defaultInput, iconClass;
    return {
        setters: [
            function (class_1_1) {
                class_1 = class_1_1;
            },
            function (styles_1_1) {
                styles_1 = styles_1_1;
            }
        ],
        execute: function () {
            tagName = "icon";
            exports_1("defaultInput", defaultInput = {
                pathD: "",
                fill: "currentColor",
                height: 24,
                width: 24
            });
            exports_1("iconClass", iconClass = class_1.createClass(tagName, styles_1.container, {
                display: "block",
                fill: "currentColor",
                margin: "auto"
            }));
        }
    };
});
//# sourceMappingURL=icon.js.map