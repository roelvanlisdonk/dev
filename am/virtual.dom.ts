import * as store from './store';

export type IAttribute = string | store.IStoreField<string> | IAttributeRenderer;

export interface IAttributes {
    [index: string]: IAttribute;
}

export interface IAttributeRenderer {
    options: any;
    render: (options: any) => string;
}

export type IClass = string | IClassRenderer;

export interface IClassRenderer {
    options: any;
    render: (options: any) => string;
}

export interface IEvent {
    listener(event: any, useCapture?: boolean): void;
    useCapture?: boolean;
}

export interface IEventRenderer {
    options: any;
    render: (options: any) => IEvent;
}

export interface IEvents {
    [index: string]: IEvent | IEventRenderer;
}

export interface INode {
    attributes?: IAttributes;
    classes?: Array<IClass>;
    events?: IEvents;
    nodes?: INodes;
}

export interface INodes {
    [index: string]: INode | string | store.IStoreField<string>;
}

export interface INodeRenderer extends INode {
    options: any;
    render: (options: any) => INode | string;
}