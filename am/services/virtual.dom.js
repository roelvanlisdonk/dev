System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root;
    function convertDomToVirtualDomInternal(node) {
        var vdNode = createNode({ nodeName: node.nodeName, renderFn: null });
        for (var i = 0, length_1 = node.childNodes.length; i < length_1; i++) {
            vdNode.childNodes.push(convertDomToVirtualDomInternal(node.childNodes[i]));
        }
        return vdNode;
    }
    function createNode(attributes) {
        if (!attributes.nodeName) {
            throw new Error('Invalid node name.');
        }
        ;
        var changed = attributes.changed === true ? true : false;
        var node = {
            afterDomInsert: attributes.afterDomInsert,
            changed: changed,
            childNodes: attributes.childNodes || [],
            class: attributes.css || [],
            eventListeners: attributes.eventListeners || [],
            nodeName: attributes.nodeName,
            renderFn: attributes.renderFn
        };
        return node;
    }
    exports_1("createNode", createNode);
    function div(attributes) {
        return createNode({ nodeName: 'div', renderFn: div });
    }
    exports_1("div", div);
    function getVirtualDom(node) {
        root = root || convertDomToVirtualDomInternal(node);
        return root;
    }
    exports_1("getVirtualDom", getVirtualDom);
    function span(attributes) {
        return createNode({ nodeName: 'span', renderFn: span });
    }
    exports_1("span", span);
    return {
        setters:[],
        execute: function() {
            root = null;
        }
    }
});
//# sourceMappingURL=virtual.dom.js.map