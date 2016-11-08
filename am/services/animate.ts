
// Add crossbrowser support for requestAnimationFrame.
const w = window as any;
w.requestAnimationFrame = w.requestAnimationFrame
    || w.mozRequestAnimationFrame
    || w.webkitRequestAnimationFrame
    || w.msRequestAnimationFrame
    || function(f: Function){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
w.cancelAnimationFrame = w.cancelAnimationFrame
    || w.mozCancelAnimationFrame
    || function(requestID: any){clearTimeout(requestID)} // fall back

export function animate(tick: (domHighResTimeStamp?: any)=> void): any {
    return window.requestAnimationFrame(tick);
}