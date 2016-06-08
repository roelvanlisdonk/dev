var zvdz;
(function (zvdz) {
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
            function isNullOrUndefined() {
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i - 0] = arguments[_i];
                }
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
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=is.null.or.undefined.js.map