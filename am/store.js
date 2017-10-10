"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_data_1 = require("./store.data");
const cuid_1 = require("./store/cuid");
// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid_1.cuid();
let cuidCounter = 0;
function endWatch(token) {
}
exports.endWatch = endWatch;
function getField(id) {
    return store_data_1.fields[id];
}
exports.getField = getField;
function getItem(id) {
    return store_data_1.items[id];
}
exports.getItem = getItem;
function newCuid() {
    cuidCounter = cuidCounter + 1;
    return `${rootCuid}-${cuidCounter}`;
}
exports.newCuid = newCuid;
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
function saveField(field, skipWatches) {
    // New field.
    if (!field.storeId) {
        field.storeId = newCuid();
        store_data_1.fields[field.storeId] = field;
        return field;
    }
    // Existing field, but not in store.
    const fieldInStore = store_data_1.fields[field.storeId];
    if (!fieldInStore) {
        store_data_1.fields[field.storeId] = field;
    }
    // Existing field in store
    const hasChanged = fieldInStore.value !== field.value;
    if (hasChanged) {
        fieldInStore.previousValue = fieldInStore.value;
        fieldInStore.value = field.value;
    }
    if (!skipWatches) {
        // Trigger watches.
        // Renderer will watch on all store changes to trigger a new rendering of the ui.
    }
    return field;
}
exports.saveField = saveField;
function saveItem(item) {
    // For each property:
    // Generate storeId if needed
    // saveField
    // If one of the fields changed:
    // trigger watches
    return item;
}
exports.saveItem = saveItem;
function saveItems(items) {
    return items;
}
exports.saveItems = saveItems;
/**
 * When a item in the store changes, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
function watch(onChange, options) {
    const token = "";
    return token;
}
exports.watch = watch;
/**
 * When the field changes in the store, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
function watchField(field, onChange, options) {
    const token = "";
    return token;
}
exports.watchField = watchField;
/**
 * When the item changes in the store, the onChange function will be called.
 * @returns A token that can be used to unwatch.
 */
function watchItem(item, onChange, options) {
    const token = "";
    return token;
}
exports.watchItem = watchItem;
//# sourceMappingURL=store.js.map