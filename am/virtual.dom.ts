import * as store from './store';

export type IVirtualDomAttribute = string | store.IStoreField<string> | IVirtualDomAttributeWithOptions;

export interface IVirtualDomAttributes {
    [index: string]: IVirtualDomAttribute;
}

export interface IVirtualDomAttributeWithOptions {
    options: any;
    render: (options: any) => string;
}

export type IVirtualDomClass = string | IVirtualDomClassWithOptions;

export interface IVirtualDomClassWithOptions {
    options: any;
    render: (options: any) => string;
}

export interface IVirtualDomEvent {
    listener(event: any): void;
    useCapture?: boolean;
}

export interface IVirtualDomEvents {
    [index: string]: IVirtualDomEvent;
}

export interface IVirtualDomNode {
    attributes?: IVirtualDomAttributes;
    classes?: Array<IVirtualDomClass>;
    events?: IVirtualDomEvents;
    nodes?: IVirtualDomNodes;
}

export interface IVirtualDomNodes {
    [index: string]: IVirtualDomNode | IVirtualDomTextNodeWithOptions | string;
}

export interface IVirtualDomNodeWithOptions extends IVirtualDomNode {
    options: any;
    render: (options: any) => IVirtualDomNode;
}

export interface IVirtualDomTextNodeWithOptions {
    options: any;
    render: (options: any) => string;
}