import { INode } from "../../virtual.dom/node";
import { EventName, IEvent } from "../../virtual.dom/event";

/**
 * Remove event if it exists for the given handler.
 */
export function removeEvent(node: INode, evt: IEvent) {
    if(!node) { throw new Error("Please provide node."); }
    if(!node.nativeNode) { throw new Error("Please provide node.nativeNode."); }
    if(!evt) { throw new Error("Please provide evt."); }
    const nativeNode = node.nativeNode;
    const eventName: EventName = (evt.name as any);

    if (nativeNode.addEventListener) {
        const normalizedEventName = eventName.substr(2);
        nativeNode.removeEventListener(normalizedEventName, evt.handler);
        return;
    }

    // Support <=IE8.
    if (nativeNode.detachEvent) {
        nativeNode.detachEvent(eventName, evt.handler);
        return;
    }
}

/**
 * Add an event, when it does not exist for the given handler.
 * Note: when the exact samen handler is used "addEventListener" will discard the adding, so only one listener will be registered. 
 */
export function renderEvent(node:INode, evt: IEvent) {
    if(!node) { throw new Error("Please provide node."); }
    if(!node.nativeNode) { throw new Error("Please provide node.nativeNode."); }
    if(!evt) { throw new Error("Please provide evt."); }
    const nativeNode = node.nativeNode;

    const eventName: EventName = (evt.name as any);
    const isCustomEvent = (eventName === "onadded" || eventName === "onremoved");
    if(isCustomEvent) {
        return;
    }

    if (nativeNode.addEventListener) {
        const normalizedEventName = eventName.substr(2);
        nativeNode.addEventListener(normalizedEventName, evt.handler);
        return;
    }

    // Support <=IE8.
    if (nativeNode.attachEvent) {
        nativeNode.attachEvent(eventName, evt.handler);
        return;
    }
}