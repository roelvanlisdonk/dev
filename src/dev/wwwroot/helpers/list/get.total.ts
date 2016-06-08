module zvdz.helpers.list {
    "use strict";

    var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
    
    /**
     * Calculates the total of a list by executing the given "getValueToAddFn" foreach item in the list.
     * @param list
     * @param fn This functions determines the value to add to the total per item.
     */
    export function getTotal(list: Array<any>, getValueToAddfn: (item: any) => number): number {
        if (isNullOrUndefined(list, getValueToAddfn)) { return; }

        var result = 0;
        for (var i = 0, length = list.length; i < length; i++) {
            var item = list[i];
            result += getValueToAddfn(item);
        }
        return result;
    }
}