/**
 * Based on: https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/
 */
export function isBoolean(obj: any): boolean {
    return "[object Boolean]" === Object.prototype.toString.call(obj);
} 