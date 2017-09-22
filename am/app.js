"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    // boot(nativeNode, componentFn: IComponentFn, options: IComponentOptions): void;
    // Components can do ajax calls be should only save data to store
    // (store module).getItem(id: string): IStoreItem
    // (store module).getField(id: string): IStoreField
    // Given data (options) execute a component function to create virtual dom.
    // When value changes on an input change the value of the binded value
}
exports.start = start;
start();
//# sourceMappingURL=app.js.map