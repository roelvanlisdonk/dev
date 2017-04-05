/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isArray(obj: any): boolean {
    return "[object Array]" === Object.prototype.toString.call(obj);
}