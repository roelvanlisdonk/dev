System.register(['../services/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var store_1;
    var User;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            User = (function () {
                function User() {
                    this.email = {
                        fieldId: "1",
                        value: null
                    };
                    this.typeId = "1";
                }
                return User;
            }());
            exports_1("User", User);
            store_1.registerType(User);
        }
    }
});
//# sourceMappingURL=User.js.map