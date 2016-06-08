var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var element;
        (function (element_1) {
            "use strict";
            var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
            /**
             * Get the first element (in the given container), containing the given attribute.
             * @param container
             * @param attributeName
             */
            function getByAttribute(container, attributeName) {
                if (isNullOrUndefined(container, attributeName)) {
                    return;
                }
                var element = container.querySelector("[" + attributeName + "]");
                return element;
            }
            element_1.getByAttribute = getByAttribute;
        })(element = helpers.element || (helpers.element = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=get.by.attribute.js.map