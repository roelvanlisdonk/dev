module dev.helpers.list {
    "use strict";
            
    /**
     * Check if the given item exists in the list by doing an exact comparison ("===").
     * @param list
     * @param itemToFind
     */
    export function itemExists(list: Array<any>, itemToFind: any): boolean {
        for (var i = 0, length = list.length; i < length; i++) {
            var item = list[i];
            if (item === itemToFind) {
                return true;
            }
        }
        return false;
    }
}