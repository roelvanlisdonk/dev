import { INode } from '.././virtual.dom';
import { IStoreField, IStoreFieldValue, saveField } from '.././store';

export function button(options: IButtonOptions): INode {
    
    const node: INode = {
        attributes: [],
        events: [],
        name: "button",
        nodes: []
    }

    // Attributes
    options.type = options.type || "button";
    node.attributes.push({name: "type", value: options.type});

    // Events
    if(options.onclick) {
        node.events.push({name: "onclick", listener: options.onclick});
    }

    // Nodes
    if(options.text) {
        node.nodes.push({text: options.text});
    }

    return node;
}

export interface IButtonOptions {
    onclick?: (evt: any) => void;
    text?: string;
    type?: "submit" | "reset" | "button";
}