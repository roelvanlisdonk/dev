var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given string contains an function.
             * @param value
             */
            function isFunction(value) {
                var value = value.trim();
                if (value.startsWith("function")) {
                    return true;
                }
                return false;
            }
            validation.isFunction = isFunction;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=is.function.js.map