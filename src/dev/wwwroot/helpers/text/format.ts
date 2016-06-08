module zvdz.helpers.text {
    "use strict";

    /**
     * Make only the first letter of the give text, lowercase.
     */
    export function format(text:string): string {
        var args = arguments;
        return text.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }
}