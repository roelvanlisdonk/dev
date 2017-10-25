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
const store_1 = require("./store");
const renderer_1 = require("./renderer");
const styles_1 = require("./components/styles");
const test_framework_1 = require("./test.framework");
window.addEventListener("unhandledrejection", function handlUnhandledrejection(event) {
    if (console) {
        console.log(event);
    }
});
function app(appData) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodes = [];
        const node = {
            attributes: [{ name: "title", value: "This is an AM app." }],
            classes: [styles_1.block],
            deps: appData.account.isAuthenticated,
            name: "my-app",
            nodes: nodes,
            refresh: app
        };
        if (appData.account.isAuthenticated.value === true) {
            const mod = yield Promise.resolve().then(function () { return require("./components/feed"); });
            const feedNode = yield mod.feed(appData);
            nodes.push(feedNode);
        }
        else {
            const mod = yield Promise.resolve().then(function () { return require("./components/login"); });
            const loginNode = yield mod.login(appData.account);
            nodes.push(loginNode);
        }
        return node;
    });
}
exports.app = app;
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const mod = yield Promise.resolve().then(function () { return require("./common/validation/is.function.test"); });
        // TODO
        // Run tests
        test_framework_1.execute();
    });
}
function start() {
    console.log("start application");
    const appData = store_1.saveItem({
        account: {
            isAuthenticated: { value: false },
            name: { value: null },
            password: { value: null }
        }
    });
    const appElement = document.body.getElementsByTagName("my-app")[0];
    renderer_1.boot(appElement, app, appData);
    runTests();
}
exports.start = start;
start();
//# sourceMappingURL=app.js.map