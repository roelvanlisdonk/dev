let _vd: INode = null;

function convertDomToVirtualDomInternal(node: Node): INode {
    const vdNode: INode = {
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


export interface INode {
    childNodes: Array<INode>;
    nodeName: string;
}