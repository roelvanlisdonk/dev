/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isNumber(obj: any): boolean {
    return "[object Number]" === Object.prototype.toString.call(obj);
}