import { isString } from "./is-string"

/**
 * Determines if the given value is a string an contains at least one character.
 * @param value
 */
export function isNonEmptyString(value: any): boolean {
    return isString(value) && (<string>value).length > 0;
} 