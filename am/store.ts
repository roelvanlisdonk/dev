import { counters, fields, items, IStoreField, IStoreFieldValue, IStoreItem, root } from './store.data';
import { cuid } from './store/cuid';



// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid();
let cuidCounter = 0;

export function getField(id: string): IStoreField<IStoreFieldValue> {
    return fields[id];
}

export function getItem(id: string): IStoreItem {
    return items[id];
}


// function notifyFieldListeners(field: IStoreField<IStoreFieldValue>) {
//     // Schedule on next tick, to prevent browser blocking.
//     setTimeout(function() {
//         const subscribers = field.subscribers;
//         let len = subscribers ? subscribers.length : 0;
//         while (len--) {
//             subscribers[len].fn(field);
//         }
//     }, 0);
// }

export function saveField(field: IStoreField<IStoreFieldValue>): void {
    fields[field.storeId] = field;
    
    // Trigger saveEvent renderer subscribes to this event, to trigger an new rendering of the ui.
}

export function saveItem(item: IStoreItem): void {
    // For each property
    //  if field then update field in store and notify field listeners.  
}

// Re-export interface from store.data.
export { 
    IStoreField as IStoreField,
    IStoreFieldValue as IStoreFieldValue,
    IStoreItem as IStoreItem
};