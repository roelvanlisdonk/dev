/**
 * Found at: https://github.com/darkskyapp/string-hash
 * @return A number between 0 and 4294967295 (inclusive).
 */
export function hash(str: string): number {
    if(!str) { throw new Error("Please provide str."); }

    let hash = 5381;
    let i = str.length;

    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    return hash >>> 0;
}