import { IVirtualDomNode } from './virtual.dom'

export interface IRenderer {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    boot(nativeNode: any, fn: (options: any) => IVirtualDomNode, options: any): void;
    render:() => void;
}

// For now use html renderer as default.