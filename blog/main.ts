namespace blog {
    "use strict";
    
    export function onActionButtonClick(text: string) {
        console.log(`action button clicked! ${text}`);
    }

    export function preventClick(evt:any) {


        evt.preventDefault();
        evt.stopPropagation();
    }

    // const layers = document.querySelectorAll("text");
    // const count = layers.length;
    // for(let i=0; i < count; i++) {
    //     const layer = layers[i];
    //     layer.addEventListener("click", preventClick);
    // }
}
