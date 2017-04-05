var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given email string contains a valid technical valid email address.
             * It excepts unicode characters.
             * @param email
             */
            function isEmail(email) {
                var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return re.test(email);
            }
            validation.isEmail = isEmail;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=is.email.js.map