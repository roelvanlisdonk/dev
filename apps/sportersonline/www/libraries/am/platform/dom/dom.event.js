System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function removeEvent(node, evt) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!evt) {
            throw new Error("Please provide evt.");
        }
        var vdNode = node.vdNode;
        if (vdNode.nativeNode.addEventListener) {
            vdNode.nativeNode.removeEventListener(evt.name, evt.fn);
            return;
        }
        if (vdNode.nativeNode.detachEvent) {
            var eventName = evt.name.substr(2);
            vdNode.nativeNode.detachEvent(eventName, evt.fn);
            return;
        }
    }
    exports_1("removeEvent", removeEvent);
    function renderEvent(node, evt) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (!evt) {
            throw new Error("Please provide evt.");
        }
        var vdNode = node.vdNode;
        var eventName = evt.name;
        var isCustomEvent = (eventName === "onadded" || eventName === "onremoved");
        if (isCustomEvent) {
            return;
        }
        if (vdNode.nativeNode.addEventListener) {
            var normalizedEventName = eventName.substr(2);
            vdNode.nativeNode.addEventListener(normalizedEventName, evt.fn);
            return;
        }
        if (vdNode.nativeNode.attachEvent) {
            vdNode.nativeNode.attachEvent(eventName, evt.fn);
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
//# sourceMappingURL=dom.event.js.map