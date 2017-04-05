module dev.helpers.list {
    "use strict";

    var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
    
    /**
     * Returns true, when the given item is found in the list by exact match ("===").
     * @param item
     * @param list
     */
    export function contains<T>(list: Array<T>, item: T): boolean {
        if (isNullOrUndefined(list, item)) { return; }

        for (var i = 0, length = list.length; i < length; i++) {
            if (list[i] === item) {
                return true;
            }
        }
        return false;
    }
}