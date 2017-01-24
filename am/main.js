System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var passcode, Employee, employee, employeeAsString, employeeAsObject, e2, AmResources, Resources, resources, calculatedText, a;
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
            AmResources = (function () {
                function AmResources() {
                }
                return AmResources;
            }());
            Resources = (function (_super) {
                __extends(Resources, _super);
                function Resources() {
                    _super.apply(this, arguments);
                    this.ok = { en: 'ok', nl: 'ok' };
                }
                return Resources;
            }(AmResources));
            resources = new Resources();
            calculatedText = { deps: [resources.ok], onchange: function () { return resources.ok + ' test'; } };
            exports_1("a", a = "");
        }
    }
});
//# sourceMappingURL=main.js.map