module dev.helpers.field {
    "use strict";
            
    /**
     * If oldValue and newValue are equal ("==="), null is returned.
     * If oldValue and newValue are NOT equal ("==="), newValue is returned.
     * @param oldValue
     * @param newValue
     */
    export function getOrUnset(oldValue: any, newValue: any): any {
        if (oldValue === newValue) {
            return null;
        } else {
            return newValue;
        }
    }    
}