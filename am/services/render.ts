
export function div(content: string) : string {
    return element('div', content);
}

function element(name: string, content: string): string {
    return `<${name}>${content}</${name}>`;
}