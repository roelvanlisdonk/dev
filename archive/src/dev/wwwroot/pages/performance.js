var dev;
(function (dev) {
    "use strict";
    function measure(fn) {
        const t0 = performance.now();
        fn();
        const t1 = performance.now();
        console.log("Call took " + (t1 - t0) + " milliseconds.");
    }
})(dev || (dev = {}));
//# sourceMappingURL=performance.js.map