import { INode } from '.././virtual.dom';
import { IStoreField, IStoreFieldValue, saveField } from '.././store';

export function input(field: IStoreField<IStoreFieldValue>): INode {
    
    const node: INode = {
        events: [{ name: "input", listener: onInputChange,useCapture: false }],
        name: "input"
    }

    function onInputChange(e: any): void {
        field.value = e.data;
        saveField(field);
    }

    return node;
}