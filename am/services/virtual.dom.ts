export function virtualModule() {
    
}

let root: IVirtualDomNode = null;

function convertDomToVirtualDomInternal(node: Node): IVirtualDomNode {
    const vdNode = createNode({ nodeName: node.nodeName, renderFn: null});
    
    for(let i = 0, length = node.childNodes.length; i < length; i++) {
        vdNode.childNodes.push(convertDomToVirtualDomInternal(node.childNodes[i]));
    }

    return vdNode;
}

export function createNode(attributes: IVirtualDomNodeAttributes) : IVirtualDomNode {
    if(!attributes.nodeName) { throw new Error('Invalid node name.'); };

    const changed = attributes.changed === true ? true: false;
    
    const node: IVirtualDomNode = {
        afterDomInsert: attributes.afterDomInsert,
        changed: changed,
        childNodes: attributes.childNodes || [],
        class: attributes.css || [],
        eventListeners: attributes.eventListeners || [],
        nodeName: attributes.nodeName,
        renderFn: attributes.renderFn
    };

    // TODO: for all other attributes just copy.

    return node;
}

export function div(attributes?: IVirtualDomNodeAttributes): IVirtualDomNode {
    return createNode({ nodeName: 'div', renderFn: div});
}

export function getVirtualDom(node: Node): IVirtualDomNode {
    root = root || convertDomToVirtualDomInternal(node);
    return root;
}

export function span(attributes?: IVirtualDomNodeAttributes): IVirtualDomNode {
    return createNode({ nodeName: 'span', renderFn: span});
}

export interface IVirtualDomNode {
    afterDomInsert?: () => void;
    changed: boolean;
    childNodes: Array<IVirtualDomNode>;
    class: Array<string>;            // TODO: make mendatory and checkout: https://github.com/typestyle/typestyle
                                    // Maybe for v1 don't use it, but use their types.
                                    // Checkout if you can remove styles with typestyle, because, we want css to be removed, when the last reference is removed.
                                    // This is one of the reasons that I don't think we can use it directly.
                                    // We should use the typestyle approach, so we have typesafety on the classnames.
    eventListeners: Array<any>;    // TODO: make mendatory and of type IEventListener.
    nodeName: string;
    renderFn: (attributes?: IVirtualDomNodeAttributes) => IVirtualDomNode; // TODO: make mendatory.
    text?: string;
}

export interface IVirtualDomNodeAttributes {
    afterDomInsert?: () => void;
    changed?: boolean;
    childNodes?: Array<IVirtualDomNode>;
    css?: Array<string>;            // TODO: make mendatory and checkout: https://github.com/typestyle/typestyle
                                    // Maybe for v1 don't use it, but use their types.
                                    // Checkout if you can remove styles with typestyle, because, we want css to be removed, when the last reference is removed.
                                    // This is one of the reasons that I don't think we can use it directly.
                                    // We should use the typestyle approach, so we have typesafety on the classnames.
    eventListeners?: Array<any>;    // TODO: make mendatory and of type IEventListener.
    nodeName?: string;
    renderFn?: (attributes?: IVirtualDomNodeAttributes) => IVirtualDomNode; // TODO: make mendatory.
    text?: string;
}