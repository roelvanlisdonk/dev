module zvdz.helpers.list {
    "use strict";
    
    var findIndexByFieldName = zvdz.helpers.list.findIndexByFieldName;
    
    /**
     * Find an item in a list with the given field name having the given value. 
     * @param list
     * @param name
     * @param value
     */
    export function findItemByFieldName(list: Array<any>, name: string, value: any): any {
        var index = findIndexByFieldName(list, name, value);
        if (index === null) {
            return null;
        } else {
            return list[index];
        }
    }
}