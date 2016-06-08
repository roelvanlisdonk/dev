module zvdz.helpers.validation {
    "use strict";

    /**
     * Determines if the given email string contains a valid technical valid email address.
     * It excepts unicode characters.
     * @param email
     */
    export function isEmail(email: string): boolean {
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    }
}