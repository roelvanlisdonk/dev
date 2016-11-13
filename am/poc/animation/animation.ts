import { addClass } from '../../services/stylesheet'
import { addEventListener } from '../../services/dom'
import { animate } from '../../services/animate'


// http://css3.bradshawenterprises.com/sliding/


const carousel = getCarousel();
document.body.appendChild(carousel);

const pager = getPager();
document.body.appendChild(pager);

let currentOffset = 0;



// export function scrollLeft() {
//     console.log("Animation poc started.");

//     let left: number = 0;
//     const element = document.getElementById("square");

//     function step() {
//         element.style.left = `${left}px`;
//         left += 20;
//         if (left < 800) {
//             animate(step);
//         }
//     }

//     animate(step);
// }

// export function adjustWidth() {
//     console.log("Animation poc started.");

//     let left: number = 0;
//     const element = document.getElementById("square");
//     element.style.width = "0";
//     function step() {
//         element.style.width = `${left}px`;
//         left += 40;
//         if (left < 1000) {
//             animate(step);
//         }
//     }

//     animate(step);
// }


function getActionButtion(click: (evt: Event) => void): HTMLElement {
    const className =  addClass("am-action-button", [
            "cursor: pointer",
            "user-select: none"
        ]);
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.textContent = "Execute";
    addEventListener(button, "click", click);

    return button;
}

function getCarousel(): HTMLElement {
    const carousel = document.createElement("carousel");
    carousel.className = addClass("am-carousel", [
            "display: block",
            "height: 410px",
            "margin: 50px auto 50px auto",
            "overflow: hidden",
            "width: 1000px"
        ]);
    carousel.appendChild(getSlidesContainer());
    return carousel;
}

function getSlide(nr: number): HTMLElement {
    const className =  addClass("am-carousel-slide", [
            "float: left",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 1000px"
        ]);
    const slide = document.createElement("slide");
    slide.className = className;
    slide.style.background = `url(img${nr}.png)`;
    return slide;
}

function getSlidesContainer(): HTMLElement {
    const container = document.createElement("container");
    container.className = addClass("am-carousel-slides-container", [
            "display: block",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 3000px",
            "-webkit-transition:all 1.0s ease-in-out",
            "-moz-transition:all 1.0s ease-in-out",
            "-o-transition:all 1.0s ease-in-out",
            "transition:all 1.0s ease-in-out"
        ]);;
    container.appendChild(getSlide(1));
    container.appendChild(getSlide(2));
    container.appendChild(getSlide(3));
    return container;
}


function getPager(): HTMLElement {
    const className =  addClass("am-carousel-pager", [
            "display: block",
            "margin: 50px auto 50px auto",
            "user-select: none",
            "width: 1000px"
        ]);
    const pager = document.createElement("div");
    pager.className = className;
    pager.appendChild(getActionButtion(slide));
    return pager;
}

function slide(evt: Event) {
    const container = carousel.childNodes[0] as HTMLElement;
    currentOffset += 1000;
    if(currentOffset >= 3000) {
        currentOffset = 0;
    }
    container.style.transform = `translateX(-${currentOffset}px)`;
    //$("#slide1_images").css("transform","translateX("+$(this).index() * -450+"px)");
}