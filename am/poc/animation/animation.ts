import { addClass } from '../../services/stylesheet'

const css = {
    square: addClass("square-a", [
        "background-color: rgb(50, 50, 50);",
        "height: 100px;",
        "left: 600px;",
        "position: absolute;",
        "top: 100px;",
        "width: 200px;"
    ])
};

const square = document.createElement("div");
square.id = "square"
square.classList.add(css.square);
document.body.appendChild(square);

export function scrollLeft() {
    console.log("Animation poc started.");

    let start: any = null;
    const element = document.getElementById("square");

    function step(timestamp: any) {
        if (!start) { 
            start = timestamp
        };
        const progress = timestamp - start;
        element.style.left = Math.min(progress/10, 200) + "px";
        if (progress < 2000) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

scrollLeft();