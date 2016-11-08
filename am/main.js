System.register(['./services/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var store_1;
    var user, Topic, User;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            user = store_1.get('test@test.com');
            Topic = (function () {
                function Topic() {
                    this.typeId = 2 .toString();
                    this.done = {
                        fieldId: "1",
                        value: false
                    };
                    this.group = {
                        fieldId: "2",
                        value: null
                    };
                    this.partialDone = {
                        fieldId: "3",
                        value: false
                    };
                }
                return Topic;
            }());
            User = (function () {
                function User() {
                    this.typeId = 1 .toString();
                    this.name = {
                        fieldId: "1",
                        value: null
                    };
                }
                return User;
            }());
        }
    }
});
//# sourceMappingURL=main.js.map