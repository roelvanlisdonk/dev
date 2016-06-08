module zvdz.helpers.element {
    "use strict";
    
    var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
    var getElementByAttribute = zvdz.helpers.element.getByAttribute;
    
    /**
     * Focussus the first element in the container with the given attribute.
     * When the element is a "kendo-drop-down-list" is uses specific logic to set the focus.
     * @param container
     * @param attribute
     */
    export function focus(container: HTMLElement, attribute: string): boolean {
        if (isNullOrUndefined(container, attribute)) { return; }
        var result = false;

        var element = getElementByAttribute(container, attribute);
        if (element) {
            if (element.hasAttribute("kendo-drop-down-list")) {
                $(element).data("kendoDropDownList").focus();
                result = true;
            } else {
                element.focus();
                result = true;
            }
        }
        
        return result;
    }
}