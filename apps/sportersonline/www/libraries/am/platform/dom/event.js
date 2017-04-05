System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function removeEvent(node, evt) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!node.nativeNode) {
            throw new Error("Please provide node.nativeNode.");
        }
        if (!evt) {
            throw new Error("Please provide evt.");
        }
        var nativeNode = node.nativeNode;
        var eventName = evt.name;
        if (nativeNode.addEventListener) {
            var normalizedEventName = eventName.substr(2);
            nativeNode.removeEventListener(normalizedEventName, evt.handler);
            return;
        }
        if (nativeNode.detachEvent) {
            nativeNode.detachEvent(eventName, evt.handler);
            return;
        }
    }
    exports_1("removeEvent", removeEvent);
    function renderEvent(node, evt) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!node.nativeNode) {
            throw new Error("Please provide node.nativeNode.");
        }
        if (!evt) {
            throw new Error("Please provide evt.");
        }
        var nativeNode = node.nativeNode;
        var eventName = evt.name;
        var isCustomEvent = (eventName === "onadded" || eventName === "onremoved");
        if (isCustomEvent) {
            return;
        }
        if (nativeNode.addEventListener) {
            var normalizedEventName = eventName.substr(2);
            nativeNode.addEventListener(normalizedEventName, evt.handler);
            return;
        }
        if (nativeNode.attachEvent) {
            nativeNode.attachEvent(eventName, evt.handler);
            return;
        }
    }
    exports_1("renderEvent", renderEvent);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=event.js.map