module zvdz.helpers.validation {
    "use strict";

    /**
     * Determines if the given value is a number.
     */
    export function isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}