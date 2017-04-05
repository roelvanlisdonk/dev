import { INode } from "../../virtual.dom/node";
import { renderNode } from "./node";

/**
 * Renders to browser DOM.
 */
export function boot(nativeNode: HTMLElement, app: INode) {
    if (!nativeNode) { throw new Error("Please provide nativeNode of type HTMLElement."); }
    if (!app) { throw new Error("Please provide app of type INodeRenderer."); }

    app.parentNode = {
        name: nativeNode.tagName.toLowerCase(),
        nativeNode: nativeNode
    };

    renderNode(null, app);
}