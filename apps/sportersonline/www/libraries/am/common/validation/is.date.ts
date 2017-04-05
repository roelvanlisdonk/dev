/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isDate(obj: any): boolean {
    return "[object Date]" === Object.prototype.toString.call(obj);
}