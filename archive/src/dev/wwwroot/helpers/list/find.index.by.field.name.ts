module dev.helpers.list {
    "use strict";
    
    /**
     * Find the index of an item in a list with the given field name having the given value.
     * @param list
     * @param name
     * @param value
     */
    export function findIndexByFieldName(list: Array<any>, name: string, value: any): number {
        for (var i = 0, length = list.length; i < length; i++) {
            var item = list[i];
            if (item[name] === value) {
                return i;
            }
        }
        return null;
    }
}