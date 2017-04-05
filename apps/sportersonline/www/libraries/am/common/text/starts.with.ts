
export function startsWith(text: string, searchString: string, position?: number): boolean {
    if (!text) {
        return false;
    }

    position = position || 0;
    return text.substr(position, searchString.length) === searchString;
}