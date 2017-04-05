System.register(["../libraries/am/ui/virtual.dom"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function feed(options) {
        var node = new virtual_dom_1.VirtualDomNode();
        node.name = "feed";
        return node;
    }
    exports_1("feed", feed);
    var virtual_dom_1, FeedOptions, DefaultLoginOptions;
    return {
        setters: [
            function (virtual_dom_1_1) {
                virtual_dom_1 = virtual_dom_1_1;
            }
        ],
        execute: function () {
            FeedOptions = (function () {
                function FeedOptions() {
                    this.style = {
                        boxSizing: "border-box"
                    };
                }
                return FeedOptions;
            }());
            exports_1("FeedOptions", FeedOptions);
            exports_1("DefaultLoginOptions", DefaultLoginOptions = new FeedOptions());
        }
    };
});
//# sourceMappingURL=feed.js.map