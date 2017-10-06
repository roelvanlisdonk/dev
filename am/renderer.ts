import { IAttribute, IClass, IEvent, INode, IRule } from "./virtual.dom";
import { addClassToStyleSheet } from "./stylesheet";

let _renderer: IRenderer;

// This value will be used to store the root virtual dom node in the store.
export const RootVirtualDomNodeStoreKey = "RootVirtualDomNode";

export function getRenderer(): IRenderer {
    return _renderer;
}

export interface IRenderer {
    renderAttribue: (attribute: IAttribute) => void;
    renderClass: (cssClass: IClass) => void;
    renderEvent: (event: IEvent) => void;
    renderNode: (node: INode) => Promise<INode>;
}

// For now use html renderer as default.
export async function boot<T>(nativeNode: HTMLElement, fn: (deps: any) => Promise<INode>, deps: any): Promise<INode> {
    _renderer = {
        renderAttribue: renderAttribute,
        renderClass: renderClass,
        renderEvent: renderEvent,
        renderNode: renderNode
    }

    // Generate the virtual dom
    const node: INode = await fn(deps);
    node.nativeNode = nativeNode;
    
    // Travese the virtual dom and sync it with the given native dom.
    _renderer.renderNode(node);

    return node;
}


function renderAttribute(attr: IAttribute): void {
    const attrName = attr.name;
    const nativeNode = attr.parent.nativeNode;
    const value = attr.value;

    const nativeValue: any = nativeNode[attrName];
    if(nativeValue != value) {
        nativeNode[attrName] = value; 
    }
}

function renderClass(cssClass: IClass): void {
    if(cssClass.shouldNotRender === false) {
        removeClass(cssClass.parent.nativeNode, cssClass.name);
    } else {
        addClass(cssClass.parent.nativeNode, cssClass.name);
    }

    if(cssClass.rendered !== true) {
        addClassToStyleSheet(cssClass);
    }
}

function renderEvent(evt: IEvent): void {
    const evtName = evt.name;
    const nativeNode = <HTMLElement>evt.parent.nativeNode;
    
    if(evt.shouldNotRender === true) {
        nativeNode.removeEventListener(evtName, evt.listener, evt.options);
    } else {
        nativeNode.addEventListener(evtName, evt.listener, evt.options);
    }
}

async function renderNode(node: INode): Promise<any> {
    const nativeNode: any = node.nativeNode;

    // Attributes
    const attrs = node.attributes;
    if(attrs && attrs.length && attrs.length > 0) {
        for(let i = 0, length = attrs.length; i < length; i++) {
            const attr = attrs[i];
            attr.parent = node;
            _renderer.renderAttribue(attr);
        }
    }

    // Classes
    const classes = node.classes;
    if(classes && classes.length && classes.length > 0) {
        for(let i = 0, length = classes.length; i < length; i++) {
            const cssClass = classes[i];
            cssClass.parent = node;
            _renderer.renderClass(cssClass);
        }
    }

    // Events
    const evts = node.events;
    if(evts && evts.length && evts.length > 0) {
        for(let i = 0, length = evts.length; i < length; i++) {
            const evt = evts[i];
            evt.parent = node;
            _renderer.renderEvent(evt);
        }
    }

    // Nodes
    const nodes: any = node.nodes;
    if(nodes && nodes.length && nodes.length > 0) {
        for(let i = 0, length = nodes.length; i < length; i++) {
            // const childNode = nodes[i];
            // childNode.parent = node;
            // _renderer.renderNode(childNode);
        }
    }
}


function addClass(element: HTMLElement, className: string): void {
    if (element.classList) {
        element.classList.add(className);
    } else if (!hasClass(element, className)) {
        var classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ");
    }
}

function hasClass(element: HTMLElement, className: string): boolean {
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (-1 < element.className.indexOf(className));
    }
}

function removeClass(element: HTMLElement, className: string): void {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        var classes = element.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        element.className = classes.join(" ");
    }
}