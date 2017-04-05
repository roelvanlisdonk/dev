/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isObject(obj: any): boolean {
    return Boolean(obj) && ("[object Object]" === Object.prototype.toString.call(obj));
}