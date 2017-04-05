import { INode } from "../virtual.dom/node";
import { IStoreField } from "../storage/store";

export type InputType = "button" | "checkbox" | "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

export function input(inp: IInput) {
    const node: INode = {
        attributes: [{name:"type", value: inp.type}],
        name: "input"
    };

    return node;
}

export interface IInput {
    field: IStoreField<any>;
    type: InputType;
}