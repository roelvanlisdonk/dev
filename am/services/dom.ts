import {IVirtualDomNode} from './virtual.dom'

export function render(element: HTMLElement, vdNode: IVirtualDomNode) {
    // TODO: must be done in the one and only, 'am request animation frame'.
    element.innerHTML = convertToHtml(vdNode);
}
function convertToHtml(node: IVirtualDomNode): string {
    let html = `<${node.nodeName}`;

    const containsContent = (node.childNodes.length > 0 || node.text);

    if(containsContent) {
        let contentHtml = '';
        for(let i = 0, length = node.childNodes.length; i < length; i++) {
            contentHtml += convertToHtml(node.childNodes[i]);
        }
        html += `>${node.text}${contentHtml}</${node.nodeName}>`;
    } else {
        html += '/>';
    }

    return html;
}