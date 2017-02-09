import { text, VirtualDomNode } from "../libraries/am/ui/virtual.dom";
import { CssStyle } from "../libraries/am/ui/styles";
import { getResource } from "../libraries/am/common/resource";

export class LoginOptions {
    style: CssStyle = {
        boxSizing: "border-box"
    };
}

export function login(options?: LoginOptions): VirtualDomNode {
    const node = new VirtualDomNode();
    node.name = "login";
    node.nodes.push(
        text("Sign in")
    );
    return node;
}

export const DefaultLoginOptions = new LoginOptions();