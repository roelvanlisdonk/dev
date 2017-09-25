"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store = require("./store");
window.addEventListener('unhandledrejection', function handlUnhandledrejection(event) {
    if (console) {
        console.log(event);
    }
});
/**
 * Some comments
 * document.getElementsByName("Thing")[0].addEventListener('change', doThing);
 */
function test() {
    const element = document.getElementsByName("Thing")[0];
}
function start() {
    console.log("start application");
    var test = store.getItem("");
    // boot(nativeNode, componentFn: IComponentFn, options: IComponentOptions): void;
    // Components can do ajax calls be should only save data to store
    // (store module).getItem(id: string): IStoreItem
    // (store module).getField(id: string): IStoreField
    // Given data (options) execute a component function to create virtual dom.
    // When value changes on an input change the value of the binded value.
    var element = document.getElementById("my-input");
    element.addEventListener('input', function (e) {
        debugger;
        console.log("keyup event detected! coming from this element:", e.target);
    }, false);
}
exports.start = start;
start();
//# sourceMappingURL=app.js.map