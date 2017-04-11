import { IClass } from "../virtual.dom/class";
import { IEvent } from "../virtual.dom/event";
import { INode } from "../virtual.dom/node";
import { container } from "../components/styles";
import { text, Text } from "./text";

const tagName: string = "button";

export const buttonClass:IClass = Object.assign({}, container, 
{   name: tagName,
    style: {
        borderColor: "#8F8E93",
        borderStyle: "solid",
        borderWidth: "1px",
        cursor: "pointer",
        display: "inline-block",
        padding: "10px",
        textAlign: "center"
    }
});

export function button(input: IButtonInput): INode {
    if (!input) { throw new Error("Please provide input."); }

    const node: INode = {
        attributes:[{name: "type", value:"button"}],
        classes: [buttonClass],
        events: [],
        name: tagName,
        nodes: []
    };

    if(input.icon) {
        node.nodes.push(input.icon);
    }

    if(input.onclick) {
        const e: IEvent = {name:"onclick", handler:input.onclick};
        node.events.push(e);
    }

    if(input.text) {
        node.nodes.push({render: text, when: input.text});
    }

    return node;
}

export interface IButtonInput {
    icon?: INode;
    onclick?: (ev: MouseEvent) => any;
    text?: Text;
}