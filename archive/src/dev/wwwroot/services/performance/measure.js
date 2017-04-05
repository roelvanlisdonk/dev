export function measure(fn) {
    var t0 = performance.now();
    fn();
    var t1 = performance.now();
    console.log("Call took " + (t1 - t0) + " milliseconds.");
}
//# sourceMappingURL=measure.js.map