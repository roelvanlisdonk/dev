import { INode } from "../virtual.dom/node";
import { getResourceValue, IResource } from "../common/resource";
import { isString } from "../common/validation/is.string";
import { IObservableField } from "../common/observable";

export type Text = string | IResource | IObservableField<any>;

export function text(input: Text): ITextNode {
    if(!input) { throw new Error("Please provide input."); }

    const node: ITextNode = {
        name: null,
        text: null
    };

    if(isString(input)) {
        node.text = (input as string);
        return node;
    }
    
    if ((input as IObservableField<any>).value !== undefined) {
        node.text = String((input as IObservableField<any>).value);
        return node;
    }

    node.text = getResourceValue((input as IResource));
    return node;
}

export interface ITextNode extends INode {
    text: string;
}