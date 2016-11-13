System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function addEventListener(element, type, listener) {
        if (element.addEventListener) {
            element.addEventListener(type, listener, false);
            return;
        }
        var el = element;
        el["attachEvent"]("on" + type, listener);
    }
    exports_1("addEventListener", addEventListener);
    function render(element, vdNode) {
        element.innerHTML = convertToHtml(vdNode);
    }
    exports_1("render", render);
    function convertToHtml(node) {
        var html = "<" + node.nodeName;
        var containsContent = (node.childNodes.length > 0 || node.text);
        if (containsContent) {
            var contentHtml = '';
            for (var i = 0, length_1 = node.childNodes.length; i < length_1; i++) {
                contentHtml += convertToHtml(node.childNodes[i]);
            }
            html += ">" + node.text + contentHtml + "</" + node.nodeName + ">";
        }
        else {
            html += '/>';
        }
        return html;
    }
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=dom.js.map