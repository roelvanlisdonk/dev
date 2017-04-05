/**
 * A part of the virtual dom tree.
 */
export interface IPart {
    name?: string;
}

/**
 * A function that one ore multiple parts of the virtual dom tree.
 */
export interface IPartFactory {
    (input: any): IPart | Array<IPart>;
}

/**
 * You should read the properties on this object like:
 * (re)render x when y changes.
 */
export interface IPartRenderer {
    render: IPart | IPartFactory; // x
    when: any;   // y   
}