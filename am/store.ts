import { fields, items, IStoreField, IStoreFieldValue, IStoreItem } from './store.data';

export function getField(id: string): IStoreField<IStoreFieldValue> {
    return fields[id];
}

export function getItem(id: string): IStoreItem {
    return items[id];
}

// Re-export interface from store.data.
export { 
    IStoreField as IStoreField,
    IStoreItem as IStoreItem
};