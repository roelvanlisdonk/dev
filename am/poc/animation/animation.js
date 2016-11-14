System.register(['../../services/dom', '../../services/animate', '../../services/stylesheet'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dom_1, animate_1, stylesheet_1;
    var currentOffset, carouselElement;
    function createActionButton(text, click) {
        var className = stylesheet_1.addClass("am-action-button", [
            "cursor: pointer",
            "user-select: none"
        ]);
        var button = document.createElement("button");
        button.className = className;
        button.type = "button";
        button.textContent = text;
        dom_1.addEventListener(button, "click", click);
        return button;
    }
    function createCarousel() {
        var element = document.createElement("carousel");
        element.className = stylesheet_1.addClass("am-carousel", [
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
    function createPager(buttons) {
        var element = document.createElement("div");
        element.className = stylesheet_1.addClass("am-carousel-pager", [
            "display: block",
            "margin: 50px auto 50px auto",
            "user-select: none",
            "width: 1000px"
        ]);
        for (var i = 0, length_1 = buttons.length; i < length_1; i++) {
            element.appendChild(buttons[i]);
        }
        return element;
    }
    function createSlide(nr) {
        var element = document.createElement("slide");
        element.className = stylesheet_1.addClass("am-carousel-slide", [
            "float: left",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 1000px"
        ]);
        element.style.background = "url(img" + nr + ".png)";
        return element;
    }
    function createSlidesContainer() {
        var element = document.createElement("container");
        element.style.transform = "translateX(0px)";
        element.style.transition = "all 1.0s ease-in-out";
        element.style.position = "static";
        element.className = stylesheet_1.addClass("am-carousel-slides-container", [
            "display: block",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "-webkit-transition:all 1.0s ease-in-out",
            "-moz-transition:all 1.0s ease-in-out",
            "-o-transition:all 1.0s ease-in-out",
            "transition:all 1.0s ease-in-out",
            "width: 3000px"
        ]);
        ;
        element.appendChild(createSlide(1));
        element.appendChild(createSlide(2));
        element.appendChild(createSlide(3));
        return element;
    }
    function slide(evt) {
        var container = carouselElement.childNodes[0];
        currentOffset += 1000;
        if (currentOffset >= 3000) {
            currentOffset = 0;
        }
        container.style.transform = "translateX(-" + currentOffset + "px)";
    }
    function scrollLeft() {
        console.log("Animation poc started.");
        var container = carouselElement.childNodes[0];
        container.style.transform = "none";
        container.style.transition = "all 0s ease-in-out";
        container.style.position = "absolute";
        container.style.left = "0";
        container.style.top = "0";
        container.style.bottom = "0";
        var left = 0;
        function step() {
            container.style.left = "-" + left + "px";
            left += 20;
            if (left < 1020) {
                animate_1.animate(step);
            }
        }
        animate_1.animate(step);
    }
    exports_1("scrollLeft", scrollLeft);
    return {
        setters:[
            function (dom_1_1) {
                dom_1 = dom_1_1;
            },
            function (animate_1_1) {
                animate_1 = animate_1_1;
            },
            function (stylesheet_1_1) {
                stylesheet_1 = stylesheet_1_1;
            }],
        execute: function() {
            currentOffset = 0;
            carouselElement = createCarousel();
            document.body.appendChild(carouselElement);
            document.body.appendChild(createPager([
                createActionButton("transform", slide),
                createActionButton("position left", scrollLeft)
            ]));
        }
    }
});
//# sourceMappingURL=animation.js.map