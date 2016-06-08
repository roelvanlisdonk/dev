var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNumeric = dev.helpers.validation.isNumeric;
            /**
             * Determines if the given value is a BSN (Burger Service Nummer), a dutch social security number.
             */
            function isBSN(bsn) {
                var j = bsn.length;
                if (j < 8 || j > 9 || isNumeric(bsn) == false || parseFloat(bsn) < 10000000 || parseFloat(bsn) >= 1000000000) {
                    return false;
                }
                var pos = 0;
                var result = 0;
                for (var i = j; i > 0; i--) {
                    var currentNumber = parseInt(bsn.charAt(pos), 10);
                    result += (i != 1) ? (currentNumber * i) : (currentNumber * i * -1);
                    pos++;
                }
                return (result % 11 == 0);
            }
            validation.isBSN = isBSN;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=is.bsn.js.map