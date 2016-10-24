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

console.log(_vd);

// Update virtual dom
// const body = _vd.childNodes[1].childNodes[2];
// body.childNodes = [];

// const div: INode = {
//     changed: true,
//     childNodes: [],
//     nodeName: 'div'
// };
// body.childNodes.push(div);




// Update dom
const body = document.createElement('body');
const element = document.createElement('div');
element.appendChild(document.createTextNode('Test !!!!'));
body.appendChild(element);

const html = document.childNodes[1];
html.appendChild(body);

export interface INode {
    changed: boolean;
    childNodes: Array<INode>;
    nodeName: string;
}