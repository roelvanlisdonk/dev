import * as vd from '.././virtual.dom';
import * as store from '.././store';

export function input(field: store.IStoreField<store.IStoreFieldValue>): vd.IVirtualDomNode {
    
    const node: vd.IVirtualDomNode = {
        events: {
            "input": {
                listener: onInputChange,
                useCapture: false
            }
        }
    }

    function onInputChange(e: any): void {
        field.value = e.data;
        store.saveField(field);
    }

    return node;
}