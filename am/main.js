System.register(['./am/services/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var store_1;
    var testUser, testRoot, Employee, employee, name2;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            testUser = new store_1.StoreObject();
            testUser.id = "";
            testRoot = {
                user: new store_1.StoreObject()
            };
            Employee = (function () {
                function Employee() {
                }
                Object.defineProperty(Employee.prototype, "fullName", {
                    get: function () {
                        console.log("fullname get!");
                        return this._fullName;
                    },
                    set: function (newName) {
                        console.log("fullname set!");
                    },
                    enumerable: true,
                    configurable: true
                });
                return Employee;
            }());
            exports_1("Employee", Employee);
            employee = new Employee();
            employee.fullName = "test";
            name2 = employee.fullName;
        }
    }
});
//# sourceMappingURL=main.js.map