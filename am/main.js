System.register(['./services/virtual.dom', './services/dom'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var virtual_dom_1, dom_1;
    var body, bodyVirtualDom;
    return {
        setters:[
            function (virtual_dom_1_1) {
                virtual_dom_1 = virtual_dom_1_1;
            },
            function (dom_1_1) {
                dom_1 = dom_1_1;
            }],
        execute: function() {
            body = document.querySelector('body');
            bodyVirtualDom = virtual_dom_1.getVirtualDom(body);
            bodyVirtualDom.childNodes = [
                virtual_dom_1.div({ text: 'my test' })
            ];
            dom_1.render(body, bodyVirtualDom);
        }
    }
});
//# sourceMappingURL=main.js.map