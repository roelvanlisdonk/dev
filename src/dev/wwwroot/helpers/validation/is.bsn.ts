module dev.helpers.validation {
    "use strict";

    var isNumeric = dev.helpers.validation.isNumeric;

    /**
     * Determines if the given value is a BSN (Burger Service Nummer), a dutch social security number.
     */
    export function isBSN(bsn: string): boolean {
        var j = bsn.length;

        if (j < 8 || j > 9 || isNumeric(bsn) == false || parseFloat(bsn) < 10000000 || parseFloat(bsn) >= 1000000000) {
            return false;
        }

        var pos: number = 0;
        var result = 0;

        for (var i: number = j; i > 0; i--) {
            var currentNumber = parseInt(bsn.charAt(pos), 10);

            result += (i != 1) ? (currentNumber * i) : (currentNumber * i * -1);

            pos++;
        }

        return (result % 11 == 0);
    }
}