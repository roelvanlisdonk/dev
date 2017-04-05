var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Determines if the values of the given property in the object a and b are exactly the same (===).
             * @param a
             * @param b
             * @param name
             * @returns True, if values of given property are exactly the samen on both objects.
             *          Null, if a or b is not set.
             */
            function propertiesAreEqual(a, b, name) {
                if (isNullOrUndefined(a, b)) {
                    return;
                }
                return (a[name] === b[name]);
            }
            validation.propertiesAreEqual = propertiesAreEqual;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=properties.are.equal.js.map