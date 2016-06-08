module dev.helpers.validation {
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
    export function propertiesAreEqual(a: any, b: any, name): boolean {
        if (isNullOrUndefined(a, b)) { return; }
        return (a[name] === b[name]);
    }
}