module zvdz.helpers.text {
    "use strict";

    /**
     * Make only the first letter of the give text, lowercase.
     */
    export function capitalize(text: string): string {
        if (!text || typeof text !== "string") {
            return '';
        }

        return text.charAt(0).toUpperCase() + text.substr(1);
    }
}