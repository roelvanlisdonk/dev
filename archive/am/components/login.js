System.register(["../libraries/am/ui/virtual.dom"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function login(options) {
        var node = new virtual_dom_1.VirtualDomNode();
        node.name = "login";
        node.nodes.push(virtual_dom_1.text("Sign in"));
        return node;
    }
    exports_1("login", login);
    var virtual_dom_1, LoginOptions, DefaultLoginOptions;
    return {
        setters: [
            function (virtual_dom_1_1) {
                virtual_dom_1 = virtual_dom_1_1;
            }
        ],
        execute: function () {
            LoginOptions = (function () {
                function LoginOptions() {
                    this.style = {
                        boxSizing: "border-box"
                    };
                }
                return LoginOptions;
            }());
            exports_1("LoginOptions", LoginOptions);
            exports_1("DefaultLoginOptions", DefaultLoginOptions = new LoginOptions());
        }
    };
});
//# sourceMappingURL=login.js.map