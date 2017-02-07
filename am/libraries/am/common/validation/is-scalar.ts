/**
 * Check if the given object is a boolean, NaN, null, number or string.
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 * Note: typof(NaN) === "number"
 * @param obj
 */
export function isScalar(obj: any): boolean
{
    return (obj === null) || (/string|number|boolean/).test(typeof obj);
}