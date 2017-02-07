/**
 * Renders to browser DOM.
 */
import { VirtualDomAttribute, VirtualDomEvent, VirtualDomNode } from '../ui/virtual.dom';
import { IRenderer } from '../ui/renderer';

export function boot(nativeNode: HTMLElement, createRootVirtualDomNode: () => VirtualDomNode) {
    
    
}

export class Renderer implements IRenderer {
    toNativeAttribute(virtualDomAttribute: VirtualDomAttribute): any {
        throw new Error("Not implemented exception.");
    }

    toNativeEvent(virtualDomEvent: VirtualDomEvent): any {
        throw new Error("Not implemented exception.");
    }
    
    toNativeNode(virtualDomNode: VirtualDomNode): any {
        throw new Error("Not implemented exception.");
    }

    toVirtualDomAttribute(nativeAttribute: any): VirtualDomAttribute {
        throw new Error("Not implemented exception.");
    }

    toVirtualDomEvent(nativeEvent: any): VirtualDomEvent {
        throw new Error("Not implemented exception.");
    }

    toVirtualDomNode(nativeNode: any): VirtualDomNode {
        throw new Error("Not implemented exception.");
    }
}