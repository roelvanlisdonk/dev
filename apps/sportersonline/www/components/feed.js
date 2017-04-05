System.register(["../libraries/am/components/styles", "../libraries/am/components/text"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function feed() {
        var node = {
            classes: [styles_1.container],
            nodes: [{ render: text_1.text, when: resources.feed }],
            name: tagName
        };
        return node;
    }
    exports_1("feed", feed);
    var styles_1, text_1, tagName, resources;
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
            tagName = "feed";
            exports_1("resources", resources = {
                feed: { en: "Feed", nl: "Feed" }
            });
        }
    };
});
//# sourceMappingURL=feed.js.map