System.register(['../../services/stylesheet'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stylesheet_1;
    var css, square;
    function animate(tick) {
        if (window["requestAnimationFrame"]) {
            return window.requestAnimationFrame(tick);
        }
        else {
            return setInterval(tick, 16);
        }
    }
    function scrollLeft() {
        console.log("Animation poc started.");
        var left = 0;
        var element = document.getElementById("square");
        function step() {
            element.style.left = left + "px";
            left += 10;
            if (left < 800) {
                animate(step);
            }
        }
        animate(step);
    }
    exports_1("scrollLeft", scrollLeft);
    return {
        setters:[
            function (stylesheet_1_1) {
                stylesheet_1 = stylesheet_1_1;
            }],
        execute: function() {
            css = {
                square: stylesheet_1.addClass("square-a", [
                    "background-color: rgb(50, 50, 50);",
                    "height: 100px;",
                    "left: 0;",
                    "position: absolute;",
                    "top: 100px;",
                    "width: 200px;"
                ])
            };
            square = document.createElement("div");
            square.id = "square";
            square.className = css.square;
            document.body.appendChild(square);
            scrollLeft();
        }
    }
});
//# sourceMappingURL=ie8.js.map