module zvdz.helpers.list {
    "use strict";

    var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
    var findIndexByItem = zvdz.helpers.list.findIndexByItem;
    
    /**
     * The number will be the index value of the item plus 1.
     * @param list
     * @param item
     */
    export function getNumberFromIndex<T>(list: Array<T>, item: T): number {
        if (isNullOrUndefined(list, item)) { return; }

        var index = findIndexByItem(list, item) || 0;
        return index + 1;
    }
}