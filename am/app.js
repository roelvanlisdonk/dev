"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("./renderer");
window.addEventListener('unhandledrejection', function handlUnhandledrejection(event) {
    if (console) {
        console.log(event);
    }
});
function app(appData) {
    return __awaiter(this, void 0, void 0, function* () {
        let node = null;
        if (appData.account.isAuthenticated.value === true) {
            console.log("loaded feed.");
            const mod = yield Promise.resolve().then(function () { return require('./components/feed'); });
            node = yield mod.feed(appData);
        }
        else {
            const mod = yield Promise.resolve().then(function () { return require('./components/login'); });
            node = yield mod.login(appData.account);
        }
        return node;
    });
}
exports.app = app;
function start() {
    console.log("start application");
    const data = {
        account: {
            isAuthenticated: { value: null },
            name: { value: null },
            password: { value: null }
        }
    };
    renderer_1.boot(document.body, app, data);
}
exports.start = start;
start();
//# sourceMappingURL=app.js.map