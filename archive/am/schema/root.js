System.register(["../libraries/am/storage/store", "./User"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var store_1, User_1, Root;
    return {
        setters: [
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (User_1_1) {
                User_1 = User_1_1;
            }
        ],
        execute: function () {
            Root = (function (_super) {
                __extends(Root, _super);
                function Root() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.user = new User_1.User();
                    return _this;
                }
                return Root;
            }(store_1.StoreObject));
            exports_1("Root", Root);
        }
    };
});
//# sourceMappingURL=root.js.map