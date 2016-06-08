module zvdz.helpers.list {
    "use strict";
    
    /**
     * Find the index of an item in a list, by checking on same object pointer. 
     * @param list
     * @param item
     */
    export function findIndexByItem<T>(list: Array<T>, item: T): number {
        for (var i = 0, length = list.length; i < length; i++) {
            if (list[i] === item) {
                return i;
            }
        }
        return null;
    }
}