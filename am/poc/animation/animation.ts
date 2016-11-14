import { addEventListener } from '../../services/dom'
import { animate } from '../../services/animate'
import { addClass } from '../../services/stylesheet'

// http://css3.bradshawenterprises.com/sliding/

let currentOffset = 0;

const carouselElement = createCarousel();
document.body.appendChild(carouselElement);
document.body.appendChild(
    createPager(
        [
            createActionButton("transform", slide),
            createActionButton("position left", scrollLeft)
        ]
    )
);

function createActionButton(text: string, click: (evt: Event) => void): HTMLElement {
    const className =  addClass("am-action-button", [
            "cursor: pointer",
            "user-select: none"
        ]);
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.textContent = text;
    addEventListener(button, "click", click);

    return button;
}

function createCarousel(): HTMLElement {
    const element = document.createElement("carousel");
    element.className = addClass("am-carousel", [
            "display: block",
            "height: 410px",
            "margin: 50px auto 50px auto",
            "overflow: hidden",
            "position: relative",
            "width: 1000px"
        ]);
    element.appendChild(createSlidesContainer());
    return element;
}

function createPager(buttons: Array<HTMLElement>): HTMLElement {  
    const element = document.createElement("div");
    element.className = addClass("am-carousel-pager", [
        "display: block",
        "margin: 50px auto 50px auto",
        "user-select: none",
        "width: 1000px"
    ]);

    for(let i = 0, length = buttons.length; i < length; i++) {
        element.appendChild(buttons[i]);    
    }
    
    return element;
}

function createSlide(nr: number): HTMLElement { 
    const element = document.createElement("slide");
    element.className = addClass("am-carousel-slide", [
            "float: left",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 1000px"
        ]);
    element.style.background = `url(img${nr}.png)`;
    return element;
}

function createSlidesContainer(): HTMLElement {
    const element = document.createElement("container");
    element.style.transform = "translateX(0px)";
    element.style.transition = "all 1.0s ease-in-out";
    element.style.position = "static";

    element.className = addClass("am-carousel-slides-container", [
            "display: block",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "-webkit-transition:all 1.0s ease-in-out",
            "-moz-transition:all 1.0s ease-in-out",
            "-o-transition:all 1.0s ease-in-out",
            "transition:all 1.0s ease-in-out",
            "width: 3000px"
        ]);;
    element.appendChild(createSlide(1));
    element.appendChild(createSlide(2));
    element.appendChild(createSlide(3));
    return element;
}


function slide(evt: Event) {
    const container = carouselElement.childNodes[0] as HTMLElement;
    currentOffset += 1000;
    if(currentOffset >= 3000) {
        currentOffset = 0;
    }
    container.style.transform = `translateX(-${currentOffset}px)`;
}

export function scrollLeft() {
    console.log("Animation poc started.");
    
    const container = carouselElement.childNodes[0] as HTMLElement;
    container.style.transform = "none";
    container.style.transition = "all 0s ease-in-out";
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.top = "0";
    container.style.bottom = "0";


    let left: number = 0;
    

    function step() {
        container.style.left = `-${left}px`;
        left += 20;
        if (left < 1020) {
            animate(step);
        }
    }

    animate(step);
}

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