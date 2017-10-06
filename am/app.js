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
function body(appData) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodes = [];
        const node = {
            deps: appData.account.isAuthenticated,
            name: "body",
            nodes: nodes,
            refresh: body
        };
        if (appData.account.isAuthenticated.value === true) {
            const mod = yield Promise.resolve().then(function () { return require('./components/feed'); });
            const feedNode = yield mod.feed(appData);
            nodes.push(feedNode);
        }
        else {
            const mod = yield Promise.resolve().then(function () { return require('./components/login'); });
            const loginNode = yield mod.login(appData.account);
            nodes.push(loginNode);
        }
        return node;
    });
}
exports.body = body;
function start() {
    console.log("start application");
    const appData = {
        account: {
            isAuthenticated: { value: null },
            name: { value: null },
            password: { value: null }
        }
    };
    renderer_1.boot(document.body, body, appData);
}
exports.start = start;
start();
//# sourceMappingURL=app.js.map