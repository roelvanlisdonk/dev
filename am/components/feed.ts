import { VirtualDomNode } from "../libraries/am/ui/virtual.dom";
import { CssStyle } from "../libraries/am/ui/styles";

export class FeedOptions {
    style: CssStyle = {
        boxSizing: "border-box"
    };
}

export function feed(options?: FeedOptions): VirtualDomNode {
    const node = new VirtualDomNode();
    node.name = "feed";
    return node;
}

export const DefaultLoginOptions = new FeedOptions();