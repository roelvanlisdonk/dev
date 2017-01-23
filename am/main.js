System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var passcode, Employee, employee, employeeAsString, employeeAsObject, e2, a;
    return {
        setters:[],
        execute: function() {
            passcode = "secret passcode";
            Employee = (function () {
                function Employee() {
                }
                Object.defineProperty(Employee.prototype, "fullName", {
                    get: function () {
                        return this._fullName;
                    },
                    set: function (newName) {
                        this._fullName = newName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Employee;
            }());
            employee = new Employee();
            employee.fullName = "Bob Smith";
            employeeAsString = JSON.stringify(employee);
            console.log(employeeAsString);
            employeeAsObject = JSON.parse(employeeAsString);
            e2 = employee;
            console.log(e2._fullName);
            exports_1("a", a = "");
        }
    }
});
//# sourceMappingURL=main.js.map