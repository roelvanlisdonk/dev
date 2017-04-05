module dev.helpers.validation {
    "use strict";
    
    /**
     * Determines if the given string contains an function.
     * @param value
     */        
    export function isFunction(value: string): boolean {
        var value = value.trim();
        if (value.startsWith("function")) {
            return true;
        }
        return false;
    }    
}