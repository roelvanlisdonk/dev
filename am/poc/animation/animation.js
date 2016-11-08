System.register(['../../services/stylesheet'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var stylesheet_1;
    var css, square;
    function scrollLeft() {
        console.log("Animation poc started.");
        var start = null;
        var element = document.getElementById("square");
        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            ;
            var progress = timestamp - start;
            element.style.left = Math.min(progress / 10, 200) + "px";
            if (progress < 2000) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
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
                    "left: 600px;",
                    "position: absolute;",
                    "top: 100px;",
                    "width: 200px;"
                ])
            };
            square = document.createElement("div");
            square.id = "square";
            square.classList.add(css.square);
            document.body.appendChild(square);
            scrollLeft();
        }
    }
});
//# sourceMappingURL=animation.js.map