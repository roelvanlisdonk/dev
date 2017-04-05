module dev.helpers.list {
    "use strict";

    var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
        
    /**
     * Remove item from the list if found.
     * Add item to the list if NOT found.
     * @param list
     * @param item
     */
    export function removeOrInsert<T>(list: Array<T>, item: T): void {
        if (isNullOrUndefined(list, item)) { return; }

        for (var i = 0, length = list.length; i < length; i++) {
            if (list[i] === item) {
                list.splice(i, 1);
                return;
            }
        }
        list.push(item);
        return;
    }
}