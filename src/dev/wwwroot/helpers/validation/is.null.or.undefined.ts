module zvdz.helpers.validation {
    "use strict";

    /**
     * Check if one of the supplied parameters is null or undefined.
     *
     * @param values
     * @returns true, when no parameters are supplied.
     *          true, when one of the supplied parameters is null or undefined.
     *          false, in all other cases.
     */
    export function isNullOrUndefined(...values: Array<any>): boolean {
        if (values.length <= 0) { return true; }
        
        for (var i = 0, length = values.length; i < length; i += 1) {
            var value = values[i];
            if (value === undefined || value === null) {
                return true;
            }
        }

        return false;  
    }
}