System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _vd, childs, body, element, html;
    function convertDomToVirtualDomInternal(node) {
        var vdNode = {
            changed: false,
            childNodes: [],
            nodeName: node.nodeName
        };
        for (var i = 0, length_1 = node.childNodes.length; i < length_1; i++) {
            vdNode.childNodes.push(convertDomToVirtualDomInternal(node.childNodes[i]));
        }
        return vdNode;
    }
    function convertDomToVirtualDom(node) {
        _vd = convertDomToVirtualDomInternal(node);
    }
    exports_1("convertDomToVirtualDom", convertDomToVirtualDom);
    function createNode(name) {
        var node = {
            changed: true,
            childNodes: [],
            nodeName: name
        };
        return node;
    }
    function div() {
        var childs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childs[_i - 0] = arguments[_i];
        }
        return createNode('div');
    }
    function span() {
        var childs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childs[_i - 0] = arguments[_i];
        }
        return createNode('span');
    }
    return {
        setters:[],
        execute: function() {
            _vd = null;
            convertDomToVirtualDom(document);
            childs = div(div(), span());
            body = document.createElement('body');
            element = document.createElement('div');
            element.appendChild(document.createTextNode('Test !!!!'));
            body.appendChild(element);
            html = document.childNodes[1];
            html.appendChild(body);
        }
    }
});
//# sourceMappingURL=main.js.map