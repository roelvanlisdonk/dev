System.register(['../services/store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var store_1;
    var Workout;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            Workout = (function () {
                function Workout() {
                    this.typeId = "2";
                    this.name = {
                        fieldId: "1",
                        value: null
                    };
                }
                return Workout;
            }());
            exports_1("Workout", Workout);
            store_1.registerType(Workout);
        }
    }
});
//# sourceMappingURL=workout.js.map