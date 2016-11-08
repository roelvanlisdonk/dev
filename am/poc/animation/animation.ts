import { addClass } from '../../services/stylesheet'

const css = {
    square: addClass("square-a", [
        "background-color: rgb(50, 50, 50);",
        "height: 100px;",
        "left: 0;",
        "position: absolute;",
        "top: 100px;",
        "width: 200px;"
    ])
};

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

const square = document.createElement("div");
square.id = "square"
square.classList.add(css.square);
document.body.appendChild(square);

function animate(tick: (domHighResTimeStamp?: any)=> void): any {
    if(window["requestAnimationFrame"]) {
        return window.requestAnimationFrame(tick);
    } else {
        return setInterval(tick, 16); // Runs every 16ms to achieve 60fps (1000ms/60 ~= 16ms).
    }
}

export function scrollLeft() {
    console.log("Animation poc started.");

    let left: number = 0;
    const element = document.getElementById("square");

    function step() {
        element.style.left = `${left}px`;
        left += 10;
        if (left < 800) {
            animate(step);
        }
    }

    animate(step);
}

scrollLeft();