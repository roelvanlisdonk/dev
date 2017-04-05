module dev.helpers.text {
    "use strict";

    export function toSnakeCase(text: string): string {
        return text.split(/(?=[A-Z])/).join("-").toLowerCase();
    }
}