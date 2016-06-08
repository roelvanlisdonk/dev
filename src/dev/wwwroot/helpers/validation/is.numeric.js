var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given value is a number.
             */
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            validation.isNumeric = isNumeric;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=is.numeric.js.map