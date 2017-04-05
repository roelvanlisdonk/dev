var dev;
(function (dev) {
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
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=is.function.js.map