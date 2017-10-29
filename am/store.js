"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_data_1 = require("./store.data");
const cuid_1 = require("./store/cuid");
const event_service_1 = require("./services/event.service");
// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid_1.cuid();
let cuidCounter = 0;
exports.storeChangedEvent = "store_changed";
function getField(id) {
    return store_data_1.fields[id];
}
exports.getField = getField;
function getItem(id) {
    return store_data_1.items[id];
}
exports.getItem = getItem;
function hasChanged(obj) {
    const result = false;
    if (isField(obj)) {
        const field = obj;
        return (field.value !== field.previousValue);
    }
    for (let attrName in obj) {
        if (obj.hasOwnProperty(attrName)) {
            const attrValue = obj[attrName];
            if (isField(attrValue)) {
                const field = attrValue;
                if (field.value !== field.previousValue) {
                    return true;
                }
            }
            if (isItem(attrValue) && hasChanged(attrValue)) {
                return true;
            }
        }
    }
    return result;
}
exports.hasChanged = hasChanged;
function isField(obj) {
    const field = obj || {};
    return (field.value !== undefined && Boolean(field.storeId));
}
exports.isField = isField;
function isItem(obj) {
    const item = obj || {};
    return Boolean(item.storeId);
}
exports.isItem = isItem;
function newCuid() {
    cuidCounter = cuidCounter + 1;
    return `${rootCuid}-${cuidCounter}`;
}
exports.newCuid = newCuid;
/**
 * When store changede event is published it will trigger a new rendering of the UI.
 */
function publishStoreChangedEvent(shouldPublish) {
    if (shouldPublish) {
        event_service_1.publish(exports.storeChangedEvent);
    }
}
/**
 * Save field to store, publish store changed event when needed.
 */
function saveField(field, skipStoreChangedEvent) {
    const whenItShouldNotBeSkipped = !skipStoreChangedEvent;
    // New field - publish store changed event.
    if (!field.storeId) {
        field.storeId = newCuid();
        store_data_1.fields[field.storeId] = field;
        publishStoreChangedEvent(whenItShouldNotBeSkipped);
        return { field: field, storeHasChanged: true };
    }
    // Existing field in store - publish store changed event only when value has changed.
    let fieldInStore = store_data_1.fields[field.storeId];
    if (fieldInStore) {
        const storeChanged = fieldInStore.value !== field.value;
        if (storeChanged) {
            fieldInStore.previousValue = fieldInStore.value;
            fieldInStore.value = field.value;
            publishStoreChangedEvent(whenItShouldNotBeSkipped);
        }
        return { field: field, storeHasChanged: storeChanged };
    }
    // Existing field but not in store - publish store changed event.
    fieldInStore = store_data_1.fields[field.storeId] = field;
    publishStoreChangedEvent(whenItShouldNotBeSkipped);
    return { field: field, storeHasChanged: true };
}
exports.saveField = saveField;
function saveItem(item, skipStoreChangedEvent) {
    // New item - save to store and publish store changed event.
    if (!item.storeId) {
        item.storeId = newCuid();
        store_data_1.items[item.storeId] = item;
        skipStoreChangedEvent = true;
        saveItem(item, skipStoreChangedEvent);
        const whenStoreChanged = !skipStoreChangedEvent;
        publishStoreChangedEvent(whenStoreChanged);
        return { item: item, storeHasChanged: true };
    }
    // Existing item in store - save to store and publish storechangedevent only, when item has changed in the store.
    let itemInStore = store_data_1.items[item.storeId];
    if (itemInStore) {
        let itemChangedInStore = false;
        // Loop all properties.
        for (let attrName in item) {
            if (item.hasOwnProperty(attrName)) {
                const attrValue = item[attrName];
                // If property is a storeitem, save it.
                if (isField(attrValue)) {
                    const result = saveField(attrValue, true);
                    itemChangedInStore = itemChangedInStore || result.storeHasChanged;
                    continue;
                }
                // If property is a storeitem, save it.
                if (isItem(attrValue)) {
                    const result = saveItem(attrValue, true);
                    itemChangedInStore = itemChangedInStore || result.storeHasChanged;
                    continue;
                }
            }
        }
        const whenNeeded = itemChangedInStore && !skipStoreChangedEvent;
        publishStoreChangedEvent(whenNeeded);
        return { item: item, storeHasChanged: itemChangedInStore };
    }
    // Store item not in store - save it to the store and publish storechangedevent.
    item = store_data_1.items[item.storeId] = item;
    saveItem(item, true);
    return { item: item, storeHasChanged: true };
}
exports.saveItem = saveItem;
function saveItems(items) {
    return items;
}
exports.saveItems = saveItems;
//# sourceMappingURL=store.js.map