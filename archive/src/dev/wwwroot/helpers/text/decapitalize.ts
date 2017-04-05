module dev.helpers.text {
    "use strict";

    /**
     * Make only the first letter of the give text, lowercase.
     */
    export function decapitalize(text: string): string {
        if (!text || typeof text !== "string") {
            return '';
        }

        return text.charAt(0).toLowerCase() + text.substr(1);
    }
}