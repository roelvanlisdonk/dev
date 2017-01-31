System.register(["./libraries/am/storage/store"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function checkLocation() {
        console.log(sf.id);
    }
    var store_1, sf, a;
    return {
        setters: [
            function (store_1_1) {
                store_1 = store_1_1;
            }
        ],
        execute: function () {
            sf = new store_1.StoreField();
            checkLocation();
            exports_1("a", a = "");
        }
    };
});
//# sourceMappingURL=main.js.map