import { INode } from "../../virtual.dom/node";
import { IClass } from "../../virtual.dom/class";
import { container } from "../../components/styles";


const tagName = "icon";

export const defaultInput: IIconInput = {
    pathD: "",
    fill: "currentColor",
    height: 24,
    width: 24
}

export const iconClass: IClass = Object.assign({}, container, 
{   name: tagName,
    style: {
        display: "block",
        fill: "currentColor",
        margin: "auto"
    }
});

function path(input: IIconInput): INode {
    const node: INode = {
        attributes: [{name:"d", value: input.pathD}],
        name: "path"
    };
    return node;
}

export function icon(input: IIconInput): INode {
    if (!input) { throw new Error("Please provide name."); }

    const mergedOptions = Object.assign({}, defaultInput, input);
    const node: INode = {
        attributes: [
            {name:"width", value:`${mergedOptions.width}`},
            {name:"height", value:`${mergedOptions.height}`},
            {name:"viewBox", value:`0 0 ${mergedOptions.width} ${mergedOptions.height}`}
        ],
        classes: [iconClass],
        name: "svg",
        nodes: [path(mergedOptions)]
    };
    
    return node;
}

export interface IIconInput {
    pathD?: string;
    fill?: string;
    height?: number;
    width?: number;
}