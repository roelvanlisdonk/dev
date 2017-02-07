System.register(["./schema/user"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1, user, a;
    return {
        setters: [
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
            user = new user_1.User();
            user.email = "roel@test.nl";
            exports_1("a", a = "");
        }
    };
});
//# sourceMappingURL=main.js.map