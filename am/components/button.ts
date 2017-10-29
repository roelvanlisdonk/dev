import { VirtualDomNode } from '.././virtual.dom';
import { StoreField, StoreFieldValue, saveField } from '.././store';

export function button(options: ButtonOptions): VirtualDomNode {
    
    const node: VirtualDomNode = {
        attributes: [],
        events: [],
        name: "button",
        nodes: []
    }

    // Attributes
    options.type = options.type || "button";
    node.attributes.push({name: "type", value: options.type});

    // Events
    if(options.onClick) {
        node.events.push({name: "click", listener: options.onClick});
    }

    // Nodes
    if(options.text) {
        node.nodes.push({text: options.text});
    }

    return node;
}

export interface ButtonOptions {
    onClick?: (evt: any) => void;
    text?: string;
    type?: "submit" | "reset" | "button";
}