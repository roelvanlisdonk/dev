import { VirtualDomNode } from "../ui/virtual.dom";
import { CssStyle } from "../ui/styles";

export const DefaultButtonOptions = new ButtonOptions();

export class ButtonOptions {
    style: CssStyle = {
        boxSizing: "border-box"
    };
}

export function button(options?: ButtonOptions): VirtualDomNode {
    const node = new VirtualDomNode();
    node.name = "am-button";
    return node;
}