System.register(["../../common/validation/is.function", "../../common/validation/is.object", "./dom.attribute", "./dom.class", "./dom.displayable", "./dom.event"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function appendNativeNode(node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        var parentVdNode = node.parentVdNode;
        var nativeNode = node.vdNode.nativeNode;
        var firstUp = null;
        var nodes = parentVdNode.nodes;
        for (var i = node.parentVdNodeChildIndex; i > 0; i--) {
            var child = nodes[i];
            if (child.vdNode && child.vdNode.nativeNode) {
                firstUp = child.vdNode.nativeNode;
            }
        }
        var shouldInsert = (firstUp && firstUp.nextSibling);
        if (shouldInsert) {
            parentVdNode.nativeNode.insertBefore(nativeNode, firstUp.nextSibling);
        }
        else {
            parentVdNode.nativeNode.appendChild(nativeNode);
        }
        fireCustomEvent("onadded", node.vdNode);
    }
    function createSvg(vdNode) {
        vdNode.isSvg = true;
        vdNode.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        vdNode.nativeNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        vdNode.nativeNode.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        vdNode.nativeNode.setAttribute("version", "1.1");
    }
    function fireCustomEvent(eventName, vdNode) {
        if (vdNode.events) {
            var total = vdNode.events.length;
            for (var i = 0; i < total; i++) {
                var evt = vdNode.events[i];
                if (evt.name === eventName) {
                    evt.fn(vdNode);
                }
            }
        }
    }
    function removeNode(parentNode, node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        var vdNode = node.vdNode;
        var nodeAsObservable = node.display;
        var nodeAsObservableFn = node.display;
        var shouldRenderNode = (node.display === true ||
            (is_object_1.isObject(node.display) && nodeAsObservable.value === true) ||
            (is_function_1.isFunction(node.display) && nodeAsObservableFn.fn(nodeAsObservableFn.input) === true));
        if (shouldRenderNode) {
            renderNode(parentNode, node);
        }
        else {
            node.parentVdNode.nativeNode.removeChild(node.vdNode.nativeNode);
            teardownNode(node);
        }
    }
    exports_1("removeNode", removeNode);
    function renderNode(parentNode, node) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        var component = node.component;
        var vdNode = component(node.input);
        node.vdNode = vdNode;
        if (parentNode) {
            node.parentVdNode = parentNode.vdNode;
        }
        if (!vdNode.nativeNode) {
            var text = vdNode["text"];
            if (text) {
                vdNode.nativeNode = document.createTextNode(text);
                appendNativeNode(node);
                return;
            }
            var isSvg = (vdNode.tagName.toLowerCase() === "svg");
            if (isSvg) {
                createSvg(vdNode);
            }
            else {
                if (node.parentVdNode && node.parentVdNode.isSvg) {
                    vdNode.isSvg = true;
                    vdNode.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", vdNode.tagName);
                }
                else {
                    vdNode.nativeNode = document.createElement(vdNode.tagName);
                }
            }
            dom_displayable_1.renderDisplayables(node, vdNode.attrs, dom_attribute_1.renderAttribute, dom_attribute_1.removeAttribute);
            dom_displayable_1.renderDisplayables(node, vdNode.classes, dom_class_1.renderClass, dom_class_1.removeClass);
            dom_displayable_1.renderDisplayables(node, vdNode.events, dom_event_1.renderEvent, dom_event_1.removeEvent);
            dom_displayable_1.renderDisplayables(node, vdNode.nodes, renderNode, removeNode);
            appendNativeNode(node);
        }
    }
    exports_1("renderNode", renderNode);
    function teardownNode(node) {
        var vdNode = node.vdNode;
        if (vdNode.nodes) {
            var total = node.vdNode.nodes.length;
            for (var i = 0; i < total; i++) {
                var n = node.vdNode.nodes[i];
                teardownNode(n);
            }
        }
        vdNode.nativeNode = null;
        fireCustomEvent("onremoved", node.vdNode);
    }
    var is_function_1, is_object_1, dom_attribute_1, dom_class_1, dom_displayable_1, dom_event_1;
    return {
        setters: [
            function (is_function_1_1) {
                is_function_1 = is_function_1_1;
            },
            function (is_object_1_1) {
                is_object_1 = is_object_1_1;
            },
            function (dom_attribute_1_1) {
                dom_attribute_1 = dom_attribute_1_1;
            },
            function (dom_class_1_1) {
                dom_class_1 = dom_class_1_1;
            },
            function (dom_displayable_1_1) {
                dom_displayable_1 = dom_displayable_1_1;
            },
            function (dom_event_1_1) {
                dom_event_1 = dom_event_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dom.node.js.map