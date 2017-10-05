import { IAttribute, IClass, IEvent, INode } from './virtual.dom'

// This value will be used to store the root virtual dom node in the store.
export const RootVirtualDomNodeStoreKey = "RootVirtualDomNode";

export function getRenderer(): IRenderer {
    return renderer;
}

export interface IRenderer {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, useCapture?: boolean): void;
    renderAttribue: (attribute: IAttribute) => void;
    renderClass: (cssClass: IClass) => void;
    renderEvent: (event: IEvent) => void;
    renderNode: (node: INode) => void;
}

// For now use html renderer as default.
export async function boot<T>(nativeNode: HTMLElement, fn: (deps: any) => Promise<INode>, deps: any): Promise<INode> {
    renderer = {
        addEventListener: addEventListener,
        renderAttribue: renderAttribue,
        renderClass: renderClass,
        renderEvent: renderEvent,
        renderNode: renderNode
    }

    // Generate the virtual dom
    const node: INode = await fn(deps);
    
    // Travese the virtual dom and sync it with the given native dom.

    return node;
}

function renderAttribue(attribute: IAttribute): void {

}

function renderClass(cssClass: IClass): void {

}

function renderEvent(event: IEvent): void {
    
}

function renderNode(node: INode): void {
    // Trek de gegeven node gelijk met de node.nativenode.
}


let renderer: IRenderer;