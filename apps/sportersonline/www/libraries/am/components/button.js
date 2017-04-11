System.register(["../components/styles", "./text"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function button(input) {
        if (!input) {
            throw new Error("Please provide input.");
        }
        var node = {
            attributes: [{ name: "type", value: "button" }],
            classes: [buttonClass],
            events: [],
            name: tagName,
            nodes: []
        };
        if (input.icon) {
            node.nodes.push(input.icon);
        }
        if (input.onclick) {
            var e = { name: "onclick", handler: input.onclick };
            node.events.push(e);
        }
        if (input.text) {
            node.nodes.push({ render: text_1.text, when: input.text });
        }
        return node;
    }
    exports_1("button", button);
    var styles_1, text_1, tagName, buttonClass;
    return {
        setters: [
            function (styles_1_1) {
                styles_1 = styles_1_1;
            },
            function (text_1_1) {
                text_1 = text_1_1;
            }
        ],
        execute: function () {
            tagName = "button";
            exports_1("buttonClass", buttonClass = Object.assign({}, styles_1.container, { name: tagName,
                style: {
                    borderColor: "#8F8E93",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    cursor: "pointer",
                    display: "inline-block",
                    padding: "10px",
                    textAlign: "center"
                }
            }));
        }
    };
});
//# sourceMappingURL=button.js.map