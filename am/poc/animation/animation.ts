import { addClass } from '../../services/stylesheet'
import { animate } from '../../services/animate'

const css = {
    square: addClass("square-a", [
        "background-color: rgb(50, 50, 50);",
        "height: 100px;",
        "left: 60px;",
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

    let left: number = 0;
    const element = document.getElementById("square");

    function step() {
        element.style.left = `${left}px`;
        left += 20;
        if (left < 800) {
            animate(step);
        }
    }

    animate(step);
}

export function adjustWidth() {
    console.log("Animation poc started.");

    let left: number = 0;
    const element = document.getElementById("square");
    element.style.width = "0";
    function step() {
        element.style.width = `${left}px`;
        left += 40;
        if (left < 1000) {
            animate(step);
        }
    }

    animate(step);
}

adjustWidth();