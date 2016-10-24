System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _vd;
    function convertDomToVirtualDomInternal(node) {
        var vdNode = {
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
    return {
        setters:[],
        execute: function() {
            _vd = null;
            convertDomToVirtualDom(document);
            console.log(_vd);
        }
    }
});
//# sourceMappingURL=main.js.map