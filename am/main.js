System.register(['./schema/User', './services/cuid', './services/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User_1, cuid_1, store_1;
    var user;
    function mainModule() {
    }
    exports_1("mainModule", mainModule);
    function AddTestData() {
        var user = new User_1.User();
        user.id = cuid_1.cuid();
        user.email.value = 'test@test.com';
        store_1.save(user);
    }
    return {
        setters:[
            function (User_1_1) {
                User_1 = User_1_1;
            },
            function (cuid_1_1) {
                cuid_1 = cuid_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            AddTestData();
            user = store_1.get('test@test.com');
        }
    }
});
//# sourceMappingURL=main.js.map