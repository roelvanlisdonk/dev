/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isString(obj: any): boolean {
    return "[object String]" === Object.prototype.toString.call(obj);
}