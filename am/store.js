"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_data_1 = require("./store.data");
const cuid_1 = require("./store/cuid");
// For performance reasons, we generate a cuid only once and use a counter to make storeId's generated in this session unique.
const rootCuid = cuid_1.cuid();
let cuidCounter = 0;
function getField(id) {
    return store_data_1.fields[id];
}
exports.getField = getField;
function getItem(id) {
    return store_data_1.items[id];
}
exports.getItem = getItem;
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
function saveField(field) {
    store_data_1.fields[field.storeId] = field;
    // Trigger saveEvent renderer subscribes to this event, to trigger an new rendering of the ui.
}
exports.saveField = saveField;
function saveItem(item) {
    // For each property
    //  if field then update field in store and notify field listeners.  
}
exports.saveItem = saveItem;
//# sourceMappingURL=store.js.map