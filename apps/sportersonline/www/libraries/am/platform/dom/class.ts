import { INode } from "../../virtual.dom/node";
import { IClass } from "../../virtual.dom/class";
import { addClassToStyleSheet } from "./stylesheet";

/**
 * Remove css class if it exists.
 */
export function removeClass(node:INode, cssClass:IClass) {
    if(!node) { throw new Error("Please provide node."); }
    if(!cssClass) { throw new Error("Please provide cssClass."); }

    const element: HTMLElement = node.nativeNode as HTMLElement;
    element.classList.remove(cssClass.name);
}

/**
 * Add css class to stylesheet and to node.classList (if it does not exist).
 */
export function renderClass(node:INode, cssClass: IClass) {
    if(!node) { throw new Error("Please provide node."); }
    if(!cssClass) { throw new Error("Please provide cssClass."); }

    addClassToStyleSheet(cssClass);
    
    const element: HTMLElement = node.nativeNode as HTMLElement;
    element.classList.add(cssClass.name);
}