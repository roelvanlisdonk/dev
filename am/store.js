"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_data_1 = require("./store.data");
function getField(id) {
    return store_data_1.fields[id];
}
exports.getField = getField;
function getItem(id) {
    return store_data_1.items[id];
}
exports.getItem = getItem;
//# sourceMappingURL=store.js.map