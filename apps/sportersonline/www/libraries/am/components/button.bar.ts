import { INode } from "../virtual.dom/node";
import { container } from "./styles";

const tagName: string = "button-bar";

export function buttonBar(): INode {
    const node: INode = {
        classes: [container],
        name: tagName
    };
    return node;
}