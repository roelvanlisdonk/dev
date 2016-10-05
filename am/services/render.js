System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function div(content) {
        return element('div', content);
    }
    exports_1("div", div);
    function element(name, content) {
        return "<" + name + ">" + content + "</" + name + ">";
    }
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=render.js.map