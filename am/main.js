System.register(["./libraries/am/storage/store", "./libraries/am/common/http"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function checkLocation() {
        console.log(sf.id);
        http_1.get('https://stub.service.am.dev:4433');
    }
    var store_1, http_1, sf, a;
    return {
        setters: [
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
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