module dev.helpers.text {
    "use strict";

    /**
     * Remove all the white space inside the string.
     */
    export function removeWhiteSpace(value: string): string {
        return value.replace(/\s+/g, '');
    }
}