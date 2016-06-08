module zvdz.helpers.list {
    "use strict";
    
    var findIndexByItem = zvdz.helpers.list.findIndexByItem;

    /**
     * Get the next item in the list based on the index of the given item.
     */
    export function findNextOnItem<T>(list: Array<T>, item: T): T {
        var index = findIndexByItem(list, item);
        var nextIndex = index + 1;
        if (nextIndex >= list.length) {
            return null;
        }
        return list[nextIndex];
    }
}