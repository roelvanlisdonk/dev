System.register(["../ui/virtual.dom"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function button(options) {
        var node = new virtual_dom_1.VirtualDomNode();
        node.name = "am-button";
        return node;
    }
    exports_1("button", button);
    var virtual_dom_1, DefaultButtonOptions, ButtonOptions;
    return {
        setters: [
            function (virtual_dom_1_1) {
                virtual_dom_1 = virtual_dom_1_1;
            }
        ],
        execute: function () {
            exports_1("DefaultButtonOptions", DefaultButtonOptions = new ButtonOptions());
            ButtonOptions = (function () {
                function ButtonOptions() {
                    this.style = {
                        boxSizing: "border-box"
                    };
                }
                return ButtonOptions;
            }());
            exports_1("ButtonOptions", ButtonOptions);
        }
    };
});
//# sourceMappingURL=button.js.map