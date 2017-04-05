System.register(["../../common/text/to.snake.case"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function addClassToStyleSheet(cssClass) {
        if (!cssClass) {
            throw new Error("Please provide cssClass.");
        }
        if (!cssClass.name) {
            throw new Error("Please provide cssClass.name.");
        }
        if (!cssClass.style) {
            throw new Error("Please provide cssClass.style.");
        }
        cssClass.selector = "." + cssClass.name;
        addRuleToStyleSheet(cssClass);
    }
    exports_1("addClassToStyleSheet", addClassToStyleSheet);
    function addRuleToStyleSheet(rule) {
        if (!rule) {
            throw new Error("Please provide rule.");
        }
        if (!rule.selector) {
            throw new Error("Please provide rule.selector.");
        }
        if (!rule.style) {
            throw new Error("Please provide rule.style.");
        }
        var selector = rule.selector;
        if (!_styles[selector]) {
            var rules = "";
            var style = rule.style;
            var keys = Object.keys(style);
            var keyCount = keys.length;
            for (var i = 0; i < keyCount; i++) {
                var key = keys[i];
                var value = style[key];
                var snake = to_snake_case_1.toSnakeCase(key);
                if (key[0] !== "_") {
                    rules += snake + ":" + value + ";";
                }
            }
            if ("insertRule" in styleSheet) {
                styleSheet.insertRule(selector + " { " + rules + " }", 0);
            }
            else if ("addRule" in styleSheet) {
                styleSheet.addRule("" + selector, rules, 0);
            }
            _styles[selector] = rule;
        }
    }
    exports_1("addRuleToStyleSheet", addRuleToStyleSheet);
    function create(id) {
        if (!id) {
            throw new Error("Please provide id.");
        }
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
    var to_snake_case_1, _styles, styleSheet;
    return {
        setters: [
            function (to_snake_case_1_1) {
                to_snake_case_1 = to_snake_case_1_1;
            }
        ],
        execute: function () {
            _styles = am.store.data.cssRules;
            styleSheet = create("am");
        }
    };
});
//# sourceMappingURL=stylesheet.js.map