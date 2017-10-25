import { counters, fields, items, IStoreField, IStoreFieldValue, IStoreItem, root } from './store.data';
import { cuid } from './store/cuid';

// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid();
let cuidCounter = 0;

export function endWatch(token: string): void {
    
}



export function getField(id: string): IStoreField<IStoreFieldValue> {
    return fields[id];
}

export function getItem(id: string): IStoreItem {
    return items[id];
}

export function hasChanged(obj: object): boolean {
    const result = false;

    if(isField(obj)){
        const field = <IStoreField<IStoreFieldValue>>obj;
        return (field.value !== field.previousValue);
    }

    for (let attrName in obj) {
        if (obj.hasOwnProperty(attrName)) {
            const attrValue = (<any>obj)[attrName];

            if(isField(attrValue)){
                const field = <IStoreField<IStoreFieldValue>>attrValue;
                if (field.value !== field.previousValue) {
                    return true;
                }
            }

            if(isItem(attrValue) && hasChanged(attrValue)) {
                return true;
            }
        }
    }

    return result;
}

export function isField(obj: object): boolean {
    const field = <IStoreField<IStoreFieldValue>>obj || <any>{};
    return (field.value !== undefined && Boolean(field.storeId));
}

export function isItem(obj: object): boolean {
    const item = <IStoreField<IStoreFieldValue>>obj || <any>{};
    return Boolean(item.storeId);
}

export function newCuid(): string {
    cuidCounter = cuidCounter + 1;
    return `${rootCuid}-${cuidCounter}`;
}

export interface IWatchOptions {
    // When true, watch will be triggerd, when any StoreField in the given tree changes, even arrays will be traversed.
    // It can handle cyclic dependencies.
    deep: boolean; 
    state?: any; // Some state that can be passe from the watch creator to the onchange function.
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

/**
 * Notes
 * - New fields (storeId is empty), will not trigger store watches.
 */
export function saveField(field: IStoreField<IStoreFieldValue>, skipWatches?: boolean): IStoreField<IStoreFieldValue> {
    
    // New field.
    if(!field.storeId) {
        field.storeId = newCuid();
        fields[field.storeId] = field;
        return field;
    }

    // Existing field, but not in store.
    const fieldInStore = fields[field.storeId]
    if(!fieldInStore) {
        fields[field.storeId] = field;
    }

    // Existing field in store
    const hasChanged = fieldInStore.value !== field.value;
    if(hasChanged) {
        fieldInStore.previousValue = fieldInStore.value;
        fieldInStore.value = field.value;
    }
    
    if(!skipWatches) {
        // Trigger watches.
        // Renderer will watch on all store changes to trigger a new rendering of the ui.
    }
    
    return field;
}

export function saveItem<T extends IStoreItem>(item: T): T {
    // For each property:
    // Generate storeId if needed
    // saveField
    // If one of the fields changed:
    // trigger watches
    return item;
}

export function saveItems(items: Array<IStoreItem | IStoreField<IStoreFieldValue>>): Array<IStoreItem | IStoreField<IStoreFieldValue>> {
    return items;
}

/**
 * When a item in the store changes, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
export function watch(onChange: (items: Array<IStoreItem | IStoreField<IStoreFieldValue>>, options?: IWatchOptions) => void, options?: IWatchOptions): string {
    const token = "";

    return token;
}

/**
 * When the field changes in the store, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
export function watchField(field: IStoreField<IStoreFieldValue>, onChange: (field: IStoreField<IStoreFieldValue>, options?: IWatchOptions) => void, options?: IWatchOptions): string {
    const token = "";

    return token;
}

/**
 * When the item changes in the store, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
export function watchItem(item: IStoreItem, onChange: (item: IStoreItem, options?: IWatchOptions) => void, options?: IWatchOptions): string {
    const token = "";
    
    return token;
}

// Re-export interface from store.data.
export { 
    IStoreField as IStoreField,
    IStoreFieldValue as IStoreFieldValue,
    IStoreItem as IStoreItem
};