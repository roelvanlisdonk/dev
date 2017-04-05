import { IAttribute } from "../../virtual.dom/attribute";
import { INode } from "../../virtual.dom/node";

/**
 * Remove attribute if it exists.
 */
export function removeAttribute(node:INode, attr:IAttribute) {
    if(!node) { throw new Error("Please provide node."); }
    if(!attr) { throw new Error("Please provide attr."); }

    node.nativeNode.removeAttribute(attr.name);
}

/**
 * Add or update attribute.
 * In case of attribute "value", set node.value.
 */
export function renderAttribute(node:INode, attr:IAttribute) {
    if(!node) { throw new Error("Please provide node."); }
    if(!attr) { throw new Error("Please provide attr."); }
    const nativeNode = node.nativeNode;

    // Handle special attribute "value".
    if (attr.name === "value") {
        nativeNode.value = String(attr.value);
        return;
    }

    // Handle all other attributes.
    nativeNode.setAttribute(attr.name, String(attr.value));
}