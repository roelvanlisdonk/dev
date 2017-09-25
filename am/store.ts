import { fields, items, IStoreField, IStoreFieldValue, IStoreItem, subscribeCounter } from './store.data';

export function getField(id: string): IStoreField<IStoreFieldValue> {
    return fields[id];
}

export function getItem(id: string): IStoreItem {
    return items[id];
}

function notifyFieldListeners(field: IStoreField<IStoreFieldValue>) {
    // Schedule on next tick, to prevent browser blocking.
    setTimeout(function() {
        const subscribers = field.subscribers;
        let len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].fn(field);
        }
    }, 0);
}

export function saveField(field: IStoreField<IStoreFieldValue>): void {
    fields[field.id] = field;
    notifyFieldListeners(field);
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