module dev.helpers.element {
    "use strict";

    var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
    
    /**
     * Get the first element (in the given container), containing the given attribute.
     * @param container
     * @param attributeName
     */
    export function getByAttribute(container: HTMLElement, attributeName: string): HTMLInputElement {
        if (isNullOrUndefined(container, attributeName)) { return; }

        var element = <HTMLInputElement>container.querySelector("[" + attributeName + "]");

        return element;
    }
}