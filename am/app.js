"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener('unhandledrejection', function handlUnhandledrejection(event) {
    if (console) {
        console.log(event);
    }
});
/**
 * Some comments 2
 */
function test() {
}
function start() {
    console.log("start application");
    //render.render();
    const throwError = true;
    later(throwError)
        .then(function handleLater(data) {
        // Don't add catch to test unhandled exceptions
    });
}
exports.start = start;
function later(throwError) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (throwError) {
                //throw "test";
                throw new Error("Some error occured.");
            }
            resolve("theValue");
        }, 200);
    });
}
start();
//# sourceMappingURL=app.js.map