var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNumeric = dev.helpers.validation.isNumeric;
            var removeWhiteSpace = dev.helpers.text.removeWhiteSpace;
            /**
             * Determines if the given string contains a dutch mobile phone number.
             */
            function isDutchMobileNumber(number) {
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
            validation.isDutchMobileNumber = isDutchMobileNumber;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=is.dutch.mobile.number.js.map