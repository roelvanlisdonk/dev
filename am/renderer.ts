import { IVirtualDomNode } from './virtual.dom'

// This value will be used to store the root virtual dom node in the store.
export const RootVirtualDomNodeStoreKey = "RootVirtualDomNode";

export interface IRenderer {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    boot(nativeNode: any, fn: (options: any) => IVirtualDomNode, options: any): void;
    render:() => void;
}

// For now use html renderer as default.

function boot(nativeNode: HTMLElement, fn: (options: any) => IVirtualDomNode, options: any): void {
    // In this version, just:

    // Create root virtualdom node, by executing the "fn" function.

    // Save root virtualdom node in the store.

    // Traverse root virtualdom node
    //  - Setup store listeners / these will rerender ui, when data in the store changes. 
    //  - Setup event listeners
    //  - Note: A render function takes one parameter "options"
    //          When one of the root properties on "options" changes the render function will be eecuted
    //          You can manually trigger rerender by exectuing the rerender function.
    //  - When nativenode has no childnodes, replace nativenode content at once.
    //  - When nativenode has childnodes (e.g. server side rendered html), adjust html as we traverse the root virtualdom node.
}
