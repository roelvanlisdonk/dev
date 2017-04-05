
export function toSnakeCase(camelCase: string): string {
    if(!camelCase) { throw new Error("Please provide camelCase."); }
    
    return camelCase.replace(/([A-Z])/g, "-$1").toLowerCase();
}