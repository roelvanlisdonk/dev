System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var w;
    function animate(tick) {
        return window.requestAnimationFrame(tick);
    }
    exports_1("animate", animate);
    return {
        setters:[],
        execute: function() {
            w = window;
            w.requestAnimationFrame = w.requestAnimationFrame
                || w.mozRequestAnimationFrame
                || w.webkitRequestAnimationFrame
                || w.msRequestAnimationFrame
                || function (f) { return setTimeout(f, 1000 / 60); };
            w.cancelAnimationFrame = w.cancelAnimationFrame
                || w.mozCancelAnimationFrame
                || function (requestID) { clearTimeout(requestID); };
        }
    }
});
//# sourceMappingURL=animate.js.map