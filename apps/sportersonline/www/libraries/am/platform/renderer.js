System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function cancelAnimationFrameFallback(requestID) {
        clearTimeout(requestID);
    }
    function requestAnimationFrameFallback(f) {
        return setTimeout(f, 1000 / 60);
    }
    function render(tick) {
        return window.requestAnimationFrame(tick);
    }
    exports_1("render", render);
    var w, requestAnimationFrame, cancelAnimationFrame;
    return {
        setters: [],
        execute: function () {
            w = window;
            requestAnimationFrame = w.requestAnimationFrame
                || w.mozRequestAnimationFrame
                || w.webkitRequestAnimationFrame
                || w.msRequestAnimationFrame
                || requestAnimationFrameFallback;
            cancelAnimationFrame = w.cancelAnimationFrame
                || w.mozCancelAnimationFrame
                || cancelAnimationFrameFallback;
        }
    };
});
//# sourceMappingURL=renderer.js.map