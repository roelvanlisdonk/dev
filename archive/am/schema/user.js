System.register(["../libraries/am/storage/store"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var store_1, sb, User;
    return {
        setters: [
            function (store_1_1) {
                store_1 = store_1_1;
            }
        ],
        execute: function () {
            sb = new store_1.StoreObject();
            User = (function (_super) {
                __extends(User, _super);
                function User() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.authorizationToken = new store_1.StoreField();
                    _this.email = new store_1.StoreField();
                    return _this;
                }
                User.prototype.isAuthorized = function () {
                    return Boolean(this.authorizationToken.value);
                };
                return User;
            }(store_1.StoreObject));
            exports_1("User", User);
        }
    };
});
//# sourceMappingURL=User.js.map