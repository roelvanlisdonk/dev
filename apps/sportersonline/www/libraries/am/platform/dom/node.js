System.register(["./attribute", "./class", "./part", "./event"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function appendNativeNode(node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        var parentNode = node.parentNode;
        var nativeNode = node.nativeNode;
        var firstUp = null;
        var nodes = parentNode.nodes;
        for (var i = node.parentNodeChildIndex; i > 0; i--) {
            var child = nodes[i];
        }
        var shouldInsert = (firstUp && firstUp.nextSibling);
        if (shouldInsert) {
            parentNode.nativeNode.insertBefore(nativeNode, firstUp.nextSibling);
        }
        else {
            parentNode.nativeNode.appendChild(nativeNode);
        }
        fireCustomEvent("onadded", node);
    }
    exports_1("appendNativeNode", appendNativeNode);
    function createSvg(node) {
        node.isSvg = true;
        node.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        node.nativeNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        node.nativeNode.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        node.nativeNode.setAttribute("version", "1.1");
    }
    function fireCustomEvent(eventName, node) {
        if (node.events) {
            var total = node.events.length;
            for (var i = 0; i < total; i++) {
                var evt = node.events[i];
                if (evt.name === eventName) {
                    evt.handler(node);
                }
            }
        }
    }
    function removeNode(node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        node.parentNode.nativeNode.removeChild(node.nativeNode);
        teardownNode(node);
    }
    exports_1("removeNode", removeNode);
    function renderNode(parentNode, node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (parentNode) {
            node.parentNode = parentNode;
        }
        if (node.nativeNode) {
            removeNode(node);
        }
        var text = node["text"];
        if (text) {
            node.nativeNode = document.createTextNode(text);
            appendNativeNode(node);
            return;
        }
        var isSvg = (node.name.toLowerCase() === "svg");
        if (isSvg) {
            createSvg(node);
        }
        else {
            if (node.parentNode && node.parentNode.isSvg) {
                node.isSvg = true;
                node.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", node.name);
            }
            else {
                node.nativeNode = document.createElement(node.name);
            }
        }
        part_1.renderParts(node, node.attributes, attribute_1.renderAttribute, attribute_1.removeAttribute);
        part_1.renderParts(node, node.classes, class_1.renderClass, class_1.removeClass);
        part_1.renderParts(node, node.events, event_1.renderEvent, event_1.removeEvent);
        part_1.renderParts(node, node.nodes, renderNode, removeNode);
        appendNativeNode(node);
    }
    exports_1("renderNode", renderNode);
    function teardownNode(node) {
        if (node.nodes) {
            var total = node.nodes.length;
            for (var i = 0; i < total; i++) {
                var n = node.nodes[i];
                teardownNode(n);
            }
        }
        node.nativeNode = null;
        fireCustomEvent("onremoved", node);
    }
    var attribute_1, class_1, part_1, event_1;
    return {
        setters: [
            function (attribute_1_1) {
                attribute_1 = attribute_1_1;
            },
            function (class_1_1) {
                class_1 = class_1_1;
            },
            function (part_1_1) {
                part_1 = part_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=node.js.map