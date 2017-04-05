var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var element;
        (function (element_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
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
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=get.by.attribute.js.map