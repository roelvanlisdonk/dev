import { IListener, IObservableField, IObservableFn } from "../../common/observable";
import { isArray } from "../../common/validation/is.array";
import { isFunction } from "../../common/validation/is.function";
import { isObject } from "../../common/validation/is.object";
import { INode } from "../../virtual.dom/node";
import { EventName, IEvent } from "../../virtual.dom/event";
import { removeAttribute, renderAttribute } from "./attribute";
import { removeClass, renderClass } from "./class";
import { renderParts } from "./part";
import { removeEvent, renderEvent } from "./event";

export function appendNativeNode(node: INode) {
    if(!node) { throw new Error("Please provide node."); }

    const parentNode: INode = node.parentNode;
    const nativeNode: any = node.nativeNode;

    // Find first child native node up the tree
    let firstUp: Node = null;
    const nodes = parentNode.nodes;
    for (let i = node.parentNodeChildIndex; i > 0; i--) {
        const child = nodes[i];

        // TODO: fix this.
        // if(child && child.nativeNode) {
        //     firstUp = child.nativeNode;
        // }
    }

    const shouldInsert = (firstUp && firstUp.nextSibling);
    if(shouldInsert) {
        parentNode.nativeNode.insertBefore(nativeNode, firstUp.nextSibling);
    } else {
        parentNode.nativeNode.appendChild(nativeNode);
    }

    fireCustomEvent("onadded", node);
}

function createSvg(node: INode) {
    node.isSvg = true;
    node.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    node.nativeNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    node.nativeNode.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    node.nativeNode.setAttribute("version", "1.1");
}

function fireCustomEvent(eventName: EventName, node: INode) {
    if(node.events) {
        const total = node.events.length;
        for (let i = 0; i < total; i++) {
            const evt: IEvent = node.events[i] as IEvent;
            if(evt.name === eventName) {
                evt.handler(node);
            }
        }
    }
}

/**
 * Remove node from dom if it exists and cleanup.
 */
export function removeNode(node: INode) {
    if(!node) { throw new Error("Please provide node."); }
    
    node.parentNode.nativeNode.removeChild(node.nativeNode);
    teardownNode(node);
}

/**
 * Add node to dom.
 * When the node already exists in the dom it will be first removed.
 */
export function renderNode(parentNode:INode, node: INode) {
    if(!node) { throw new Error("Please provide node."); }

    
    // TODO: load component dynamically, when component is a string.

    
    if(parentNode) {
        node.parentNode = parentNode;
    }
    
    if(node.nativeNode) {
        removeNode(node);
    }

    // Handle text nodes.
    const text = (node as any)["text"];
    if (text) {
        node.nativeNode = document.createTextNode(text);
        appendNativeNode(node);
        return;
    }

    const isSvg = (node.name.toLowerCase() === "svg");
    if(isSvg) {
        createSvg(node);
    } else {
        if(node.parentNode && node.parentNode.isSvg) {
            node.isSvg = true;
            node.nativeNode = document.createElementNS("http://www.w3.org/2000/svg", node.name);
        } else {
            node.nativeNode = document.createElement(node.name);
        }
    }

    renderParts(node, node.attributes, renderAttribute, removeAttribute);
    renderParts(node, node.classes, renderClass, removeClass);
    renderParts(node, node.events, renderEvent, removeEvent);
    // TODO: render Rules
    // TODO: render Media
    renderParts(node, node.nodes, renderNode, removeNode);

    appendNativeNode(node);
}

function teardownNode(node: INode) {
    if(node.nodes) {
        const total = node.nodes.length;
        for (let i = 0; i < total; i++) {
            const n = node.nodes[i];
            teardownNode(n);
        }
    }

    // TODO: Remove all displayable IListeners

    node.nativeNode = null;
    fireCustomEvent("onremoved", node);
}