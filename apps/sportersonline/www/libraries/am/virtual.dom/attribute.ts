import { IPart, IPartFactory, IPartRenderer } from "./part";

export interface IAttribute extends IPart {
    name: string;
    value?: string;
}

export interface IAttributeFactory extends IPartFactory {
    (input: any): IAttribute | Array<IAttribute>;
}

/**
 * You should read the properties on this object like:
 * (re)render x when y changes.
 */
export interface IAttributeRenderer extends IPartRenderer
{
    render: IAttribute | IAttributeFactory; // x
    when: any; // y
}