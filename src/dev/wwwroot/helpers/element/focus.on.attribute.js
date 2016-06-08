var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var element;
        (function (element_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            var getElementByAttribute = dev.helpers.element.getByAttribute;
            /**
             * Focussus the first element in the container with the given attribute.
             * When the element is a "kendo-drop-down-list" is uses specific logic to set the focus.
             * @param container
             * @param attribute
             */
            function focus(container, attribute) {
                if (isNullOrUndefined(container, attribute)) {
                    return;
                }
                var result = false;
                var element = getElementByAttribute(container, attribute);
                if (element) {
                    if (element.hasAttribute("kendo-drop-down-list")) {
                        $(element).data("kendoDropDownList").focus();
                        result = true;
                    }
                    else {
                        element.focus();
                        result = true;
                    }
                }
                return result;
            }
            element_1.focus = focus;
        })(element = helpers.element || (helpers.element = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=focus.on.attribute.js.map