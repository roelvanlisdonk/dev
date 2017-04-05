/**
 * Fall back to clearTimeout, for browsers that do not support cancelAnimationFrame.
 */
function cancelAnimationFrameFallback(requestID: any) {
    clearTimeout(requestID);
}

/**
 * Fall back to setTimeout, calling code every 60ms, for browsers that do not support requestAnimationFrame.
 */
function requestAnimationFrameFallback(f: Function) { 
    return setTimeout(f, 1000/60);
}

const w = window as any;
const requestAnimationFrame = w.requestAnimationFrame
    || w.mozRequestAnimationFrame
    || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame
    || requestAnimationFrameFallback;
 
const cancelAnimationFrame = w.cancelAnimationFrame
    || w.mozCancelAnimationFrame
    || cancelAnimationFrameFallback;


export function render(tick: (domHighResTimeStamp?: any) => void): any {
    return window.requestAnimationFrame(tick);
}