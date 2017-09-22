import * as store from './store';


export interface IVirtualDomCssClassWithOptions {
    options: any;
    render: (options: any) => boolean;
}

export type IVirtualDomCssClass = boolean | store.IStoreField<boolean> | IVirtualDomCssClassWithOptions;

export interface IVirtualDomCssClasss {
    [index: string]: IVirtualDomCssClass;
}

export interface IVirtualDomAttributeWithOptions {
    options: any;
    render: (options: any) => string;
}

export type IVirtualDomAttribute = string | store.IStoreField<string> | IVirtualDomAttributeWithOptions;

export interface IVirtualDomAttributes {
    [index: string]: IVirtualDomAttribute;
}

export interface IVirtualDomNodeWithOptions extends IVirtualDomNode {
    options: any;
    render: (options: any) => IVirtualDomNode;
}

export interface IVirtualDomNodes {
    [index: string]: IVirtualDomNode;
}

export interface IVirtualDomNode {
    attributes: IVirtualDomAttributes;
    events: IVirtualDomEvents;
    nodes: IVirtualDomNodes;
}

export interface IVirtualDomEvents {
    [index: string]: IVirtualDomEvent;
}

export interface IVirtualDomEvent {
    (event: any): void;
}