module zvdz.helpers.validation {
    "use strict";

    /**
     * Determines if the given value is "empty".
     * @param value
     * @returns true, when value is undefined.
     * @returns true, when value is null.
     * @returns true, when value is "".
     * @returns true, when value is an array with no items.
     */
    export function isEmpty(value?: any): boolean {
        return (
                value === undefined ||
                value === null ||
                value === "" ||
                (Array.isArray(value) && value.length <= 0)
            );
    }
}