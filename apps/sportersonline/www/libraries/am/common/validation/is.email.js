System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isEmail(email) {
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    }
    exports_1("isEmail", isEmail);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=is.email.js.map