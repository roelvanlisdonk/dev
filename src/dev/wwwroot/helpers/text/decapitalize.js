var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_1) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function decapitalize(text) {
                if (!text || typeof text !== "string") {
                    return '';
                }
                return text.charAt(0).toLowerCase() + text.substr(1);
            }
            text_1.decapitalize = decapitalize;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=decapitalize.js.map