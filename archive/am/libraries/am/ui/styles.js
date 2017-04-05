System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function addClass(name, rules) {
        var rule = _rules[name];
        if (rule) {
            return name;
        }
        var rulesAsString = rules.join(";");
        if ("insertRule" in styleSheet) {
            styleSheet.insertRule("." + name + " { " + rulesAsString + " }", 0);
        }
        else if ("addRule" in styleSheet) {
            styleSheet.addRule("." + name, rulesAsString, 0);
        }
        _rules[name] = rulesAsString;
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
    var _rules, styleSheet;
    return {
        setters: [],
        execute: function () {
            _rules = {};
            styleSheet = create("am");
        }
    };
});
//# sourceMappingURL=styles.js.map