import { counters, fields, items, StoreField, StoreFieldValue, StoreItem } from "./store.data";
import { cuid } from "./store/cuid";
import { publish } from "./services/event.service";

// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid();
let cuidCounter = 0;
export const STORE_CHANGED_EVENT = "store_changed";

export function getField(id: string): StoreField<StoreFieldValue> {
    return fields[id];
}

export function getItem(id: string): StoreItem {
    return items[id];
}

export function hasChanged(obj: object): boolean {
    const result = false;

    if(isField(obj)){
        const field = <StoreField<StoreFieldValue>>obj;
        return (field.value !== field.previousValue);
    }

    for (let attrName in obj) {
        if (obj.hasOwnProperty(attrName)) {
            const attrValue = (<any>obj)[attrName];

            if(isField(attrValue)){
                const field = <StoreField<StoreFieldValue>>attrValue;
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
    const field = <StoreField<StoreFieldValue>>obj || <any>{};
    return (field.value !== undefined && Boolean(field.storeId));
}

export function isItem(obj: object): boolean {
    const item = <StoreField<StoreFieldValue>>obj || <any>{};
    return Boolean(item.storeId);
}

export function newCuid(): string {
    cuidCounter = cuidCounter + 1;
    return `${rootCuid}-${cuidCounter}`;
}

/**
 * When store changede event is published it will trigger a new rendering of the UI.
 */
function publishStoreChangedEvent(shouldPublish: boolean): void {
    if(shouldPublish) {
        publish(STORE_CHANGED_EVENT);  
    }
}

/**
 * Save field to store, publish store changed event when needed.
 */
export function saveField(field: StoreField<StoreFieldValue>, skipStoreChangedEvent?: boolean): SaveFieldResult {
    const whenItShouldNotBeSkipped = !skipStoreChangedEvent;

    // New field - publish store changed event.
    if(!field.storeId) {
        field.storeId = newCuid();
        fields[field.storeId] = field;
        
        publishStoreChangedEvent(whenItShouldNotBeSkipped);
        
        return {field: field, storeHasChanged: true};
    } 
    
    // Existing field in store - publish store changed event only when value has changed.
    let fieldInStore = fields[field.storeId]
    if(fieldInStore) {
        const storeChanged = fieldInStore.value !== field.value;
        if(storeChanged) {
            fieldInStore.previousValue = fieldInStore.value;
            fieldInStore.value = field.value;

            publishStoreChangedEvent(whenItShouldNotBeSkipped);
        }
        return {field: field, storeHasChanged: storeChanged};
    }    

    // Existing field but not in store - publish store changed event.
    fieldInStore = fields[field.storeId] = field;
    publishStoreChangedEvent(whenItShouldNotBeSkipped);
        
    return {field: field, storeHasChanged: true};
}

export function saveItem<T extends StoreItem>(item: T, skipStoreChangedEvent?: boolean): SaveItemResult<T> {

    // New item - save to store and publish store changed event.
    if(!item.storeId) {
        item.storeId = newCuid();
        items[item.storeId] = item;
        skipStoreChangedEvent = true;
        saveItem(item, skipStoreChangedEvent);

        const whenNeeded = !skipStoreChangedEvent;
        publishStoreChangedEvent(whenNeeded);
        
        return {item: item, storeHasChanged: true};
    } 

    // Existing item in store - save to store and publish storechangedevent only, when item has changed in the store.
    let itemInStore = items[item.storeId]
    if(itemInStore) {
        let itemChangedInStore = false;
        
        // Loop all properties.
        for (let attrName in item) {
            if (item.hasOwnProperty(attrName)) {
                const attrValue = (<any>item)[attrName];
    
                // If property is a storeitem, save it.
                if(isField(attrValue)) {
                    const result = saveField(attrValue, true);
                    itemChangedInStore = itemChangedInStore || result.storeHasChanged;
                    continue;
                }
    
                // If property is a storeitem, save it.
                if(isItem(attrValue)) {
                    const result = saveItem(attrValue, true);
                    itemChangedInStore = itemChangedInStore || result.storeHasChanged;
                    continue;
                }
            }
        }

        const whenNeeded = itemChangedInStore && !skipStoreChangedEvent;
        publishStoreChangedEvent(whenNeeded);
        
        return {item: item, storeHasChanged: itemChangedInStore};
    }

    // Store item not in store - save it to the store and publish storechangedevent.
    item = items[item.storeId] = item;
    saveItem(item, true);

    return {item: item, storeHasChanged: true};
}

export function saveItems(items: Array<StoreItem | StoreField<StoreFieldValue>>): Array<StoreItem | StoreField<StoreFieldValue>> {
    return items;
}

export interface SaveFieldResult {
    field: StoreField<StoreFieldValue>;
    storeHasChanged: boolean;
}

export interface SaveItemResult<T extends StoreItem> {
    item: T;
    storeHasChanged: boolean;
}

export interface WatchOptions {
    // When true, watch will be triggerd, when any StoreField in the given tree changes, even arrays will be traversed.
    // It can handle cyclic dependencies.
    deep: boolean; 
    state?: any; // Some state that can be passe from the watch creator to the onchange function.
}

// Re-export interface from store.data.
export { 
    StoreField as StoreField,
    StoreFieldValue as StoreFieldValue,
    StoreItem as StoreItem
};