System.register(['../../services/stylesheet', '../../services/dom'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stylesheet_1, dom_1;
    var carousel, pager, currentOffset;
    function getActionButtion(click) {
        var className = stylesheet_1.addClass("am-action-button", [
            "cursor: pointer",
            "user-select: none"
        ]);
        var button = document.createElement("button");
        button.className = className;
        button.type = "button";
        button.textContent = "Execute";
        dom_1.addEventListener(button, "click", click);
        return button;
    }
    function getCarousel() {
        var carousel = document.createElement("carousel");
        carousel.className = stylesheet_1.addClass("am-carousel", [
            "display: block",
            "height: 410px",
            "margin: 50px auto 50px auto",
            "overflow: hidden",
            "width: 1000px"
        ]);
        carousel.appendChild(getSlidesContainer());
        return carousel;
    }
    function getSlide(nr) {
        var className = stylesheet_1.addClass("am-carousel-slide", [
            "float: left",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 1000px"
        ]);
        var slide = document.createElement("slide");
        slide.className = className;
        slide.style.background = "url(img" + nr + ".png)";
        return slide;
    }
    function getSlidesContainer() {
        var container = document.createElement("container");
        container.className = stylesheet_1.addClass("am-carousel-slides-container", [
            "display: block",
            "height: 410px",
            "margin: 0",
            "padding: 0",
            "width: 3000px",
            "-webkit-transition:all 1.0s ease-in-out",
            "-moz-transition:all 1.0s ease-in-out",
            "-o-transition:all 1.0s ease-in-out",
            "transition:all 1.0s ease-in-out"
        ]);
        ;
        container.appendChild(getSlide(1));
        container.appendChild(getSlide(2));
        container.appendChild(getSlide(3));
        return container;
    }
    function getPager() {
        var className = stylesheet_1.addClass("am-carousel-pager", [
            "display: block",
            "margin: 50px auto 50px auto",
            "user-select: none",
            "width: 1000px"
        ]);
        var pager = document.createElement("div");
        pager.className = className;
        pager.appendChild(getActionButtion(slide));
        return pager;
    }
    function slide(evt) {
        var container = carousel.childNodes[0];
        currentOffset += 1000;
        if (currentOffset >= 3000) {
            currentOffset = 0;
        }
        container.style.transform = "translateX(-" + currentOffset + "px)";
    }
    return {
        setters:[
            function (stylesheet_1_1) {
                stylesheet_1 = stylesheet_1_1;
            },
            function (dom_1_1) {
                dom_1 = dom_1_1;
            }],
        execute: function() {
            carousel = getCarousel();
            document.body.appendChild(carousel);
            pager = getPager();
            document.body.appendChild(pager);
            currentOffset = 0;
        }
    }
});
//# sourceMappingURL=animation.js.map