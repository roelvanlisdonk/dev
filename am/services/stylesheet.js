System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var styleSheet;
    function addClass(name, rules) {
        var rulesAsString = rules.join("");
        if ("insertRule" in styleSheet) {
            styleSheet.insertRule("." + name + " { " + rulesAsString + " }", 0);
        }
        else if ("addRule" in styleSheet) {
            styleSheet.addRule("." + name, rulesAsString, 0);
        }
        return name;
    }
    exports_1("addClass", addClass);
    function create(id) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement("style");
        style.id = id;
        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = "";
        }
        else {
            style.appendChild(document.createTextNode(""));
        }
        head.appendChild(style);
        return style.sheet || style.styleSheet;
    }
    return {
        setters:[],
        execute: function() {
            styleSheet = create("am");
        }
    }
});
//# sourceMappingURL=stylesheet.js.map