// TODO: move "convertDomToVirtualDom" to services/dom
// TODO: create a node factory function in services/dom


let _vd: INode = null;

function convertDomToVirtualDomInternal(node: Node): INode {
    const vdNode: INode = {
        changed: false,
        childNodes: [],
        nodeName: node.nodeName
    };
    
    for(let i = 0, length = node.childNodes.length; i < length; i++) {
        vdNode.childNodes.push(convertDomToVirtualDomInternal(node.childNodes[i]));
    }

    return vdNode;
}

export function convertDomToVirtualDom(node: Node) {
    _vd = convertDomToVirtualDomInternal(node);
}

convertDomToVirtualDom(document);






// Update virtual dom
// const body = _vd.childNodes[1].childNodes[2];
// body.childNodes = [];

// const div: INode = {
//     changed: true,
//     childNodes: [],
//     nodeName: 'div'
// };
// body.childNodes.push(div);

function createNode(name: string) : INode {
    const node: INode = {
        changed: true,
        childNodes: [],
        nodeName: name
    };
    return node;
}

function div(...childs: Array<INode>): INode {
    return createNode('div');
}

function span(...childs: Array<INode>): INode {
    return createNode('span');
}

const childs = div(
    div(),
    span()
);

//      const result = 
//      div({ css: [container], childs: [
//          div({ css: [label], text: resources.infoOnCars)
//      ]});


// Update dom
const body = document.createElement('body');
const element = document.createElement('div');
element.appendChild(document.createTextNode('Test !!!!'));
body.appendChild(element);

const html = document.childNodes[1];
html.appendChild(body);

export interface INode {
    afterDomInsert?: () => void;
    changed: boolean;
    childNodes: Array<INode>;
    css?: Array<string>;            // TODO: make mendatory and checkout: https://github.com/typestyle/typestyle
                                    // Maybe for v1 don't use it, but use their types.
                                    // Checkout if you can remove styles with typestyle, because, we want css to be removed, when the last reference is removed.
                                    // This is one of the reasons that I don't think we can use it directly.
                                    // We should use the typestyle approach, so we have typesafety on the classnames.
    eventListeners?: Array<any>;    // TODO: make mendatory and of type IEventListener.
    nodeName: string;
    renderFn?: () => INode;         // TODO: make mendatory.
}