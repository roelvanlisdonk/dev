module dev.helpers.validation {
    "use strict";

    var isNumeric = dev.helpers.validation.isNumeric;
    var removeWhiteSpace = dev.helpers.text.removeWhiteSpace;

    /**
     * Determines if the given string contains a dutch mobile phone number.
     */
    export function isDutchMobileNumber(number: string): boolean {
        var mobileNumber = removeWhiteSpace(number);       

        if (!isNumeric(mobileNumber)) {
            return false;
        }

        if (mobileNumber.length !== 10) {
            return false;
        }

        if (mobileNumber.substring(0, 2) !== '06') {
            return false;
        }

        return true;
    }
}