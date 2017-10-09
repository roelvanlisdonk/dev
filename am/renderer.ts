import { IAttribute, IClass, IEvent, INode, IRule } from "./virtual.dom";
import { addClassToStyleSheet } from "./stylesheet";

let _renderer: IRenderer;

// This value will be used to store the root virtual dom node in the store.
export const RootVirtualDomNodeStoreKey = "RootVirtualDomNode";

export function getRenderer(): IRenderer {
    return _renderer;
}

export interface IRenderer {
    renderAttribue: (attribute: IAttribute, isNew: boolean) => void;
    renderClass: (cssClass: IClass, isNew: boolean) => void;
    renderEvent: (event: IEvent, isNew: boolean) => void;
    renderNode: (node: INode, isNew: boolean) => Promise<INode>;
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
    _renderer.renderNode(node, true);

    return node;
}

function renderAttribute(attr: IAttribute, isNew: boolean): void {
    let refreshedAttr = attr;

    // If attr.value is a IStoreField, set refresh method.
    // Check if deps changed
    // Check if refresh exists
    if(!isNew) {
        attr = attr.refresh(attr.deps);
    }

    const attrName = refreshedAttr.name;
    const nativeNode = refreshedAttr.parent.nativeNode;
    const value = refreshedAttr.value;

    const nativeValue: any = nativeNode[attrName];
    if(nativeValue != value) {
        nativeNode[attrName] = value; 
    }
}

function renderClass(cssClass: IClass, isNew: boolean): void {
    let refreshedClass = cssClass;

    // Check if deps changed
    // Check if refresh exists
    if(!isNew) {
        cssClass = cssClass.refresh(cssClass.deps);
    }

    if(refreshedClass.shouldNotRender === false) {
        removeClass(refreshedClass.parent.nativeNode, refreshedClass.name);
    } else {
        addClass(refreshedClass.parent.nativeNode, refreshedClass.name);
    }

    if(refreshedClass.rendered !== true) {
        addClassToStyleSheet(refreshedClass);
    }
}

function renderEvent(evt: IEvent, isNew: boolean): void {
    let refreshedEvent = evt;

    // Check if deps changed
    // Check if refresh exists
    if(!isNew) {
        evt = evt.refresh(evt.deps);
    }

    const evtName = refreshedEvent.name;
    const nativeNode = <HTMLElement>refreshedEvent.parent.nativeNode;
    
    if(refreshedEvent.shouldNotRender === true) {
        nativeNode.removeEventListener(evtName, refreshedEvent.listener, refreshedEvent.options);
    } else {
        nativeNode.addEventListener(evtName, refreshedEvent.listener, refreshedEvent.options);
    }
}

async function renderNode(node: INode, isNew: boolean): Promise<any> {
    let refreshedNode = node;
    if(!isNew) {
        refreshedNode = await node.refresh(node.deps);
    }
    
    const nativeNode: any = refreshedNode.nativeNode;

    // Attributes
    const attrs = refreshedNode.attributes;
    if(attrs && attrs.length && attrs.length > 0) {
        for(let i = 0, length = attrs.length; i < length; i++) {
            const attr = attrs[i];
            attr.parent = refreshedNode;
            _renderer.renderAttribue(attr, isNew);
        }
    }

    // Classes
    const classes = refreshedNode.classes;
    if(classes && classes.length && classes.length > 0) {
        for(let i = 0, length = classes.length; i < length; i++) {
            const cssClass = classes[i];
            cssClass.parent = refreshedNode;
            _renderer.renderClass(cssClass, isNew);
        }
    }

    // Events
    const evts = refreshedNode.events;
    if(evts && evts.length && evts.length > 0) {
        for(let i = 0, length = evts.length; i < length; i++) {
            const evt = evts[i];
            evt.parent = refreshedNode;
            _renderer.renderEvent(evt, isNew);
        }
    }

    // Nodes
    if(isNew) {
        const frag = document.createDocumentFragment();
         const nodes: INode[] = refreshedNode.nodes;
         if(nodes && nodes.length && nodes.length > 0) {
             for(let i = 0, length = nodes.length; i < length; i++) {
                const childNode = nodes[i];
                childNode.parent = node;
                
                if(childNode.text) {
                    childNode.nativeNode = document.createTextNode(childNode.text);
                    frag.appendChild(childNode.nativeNode);
                }

                if(childNode.name) {
                    childNode.nativeNode = document.createElement(childNode.name);
                    frag.appendChild(childNode.nativeNode);
                    _renderer.renderNode(childNode, isNew);
                    
                }
             }
             node.nativeNode.appendChild(frag);
         }
    }

    return node;
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