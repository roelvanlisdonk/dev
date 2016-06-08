var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Check if one of the supplied parameters is null or undefined.
             *
             * @param values
             * @returns true, when no parameters are supplied.
             *          true, when one of the supplied parameters is null or undefined.
             *          false, in all other cases.
             */
            function isNullOrUndefined(...values) {
                if (values.length <= 0) {
                    return true;
                }
                for (var i = 0, length = values.length; i < length; i += 1) {
                    var value = values[i];
                    if (value === undefined || value === null) {
                        return true;
                    }
                }
                return false;
            }
            validation.isNullOrUndefined = isNullOrUndefined;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=is.null.or.undefined.js.map