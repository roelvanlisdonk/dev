import { IStoreField } from './store';
import { IStyle } from './style';

// In this version, change detection is based on IStoreField changes.

export interface IAttribute extends IVirtualDomPart {
    refresh?: (deps: any) => IAttribute;
    value: string | null;
}

export interface IClass extends IVirtualDomPart {
    refresh?: (deps: any) => IClass;
    rendered?: boolean;
    style: IStyle | null;
}

export interface IEvent extends IVirtualDomPart {
    listener: (event: any, options?: boolean) => void | null;
    refresh?: (deps: any) => IEvent;
    options?: boolean;
}

export interface INode extends IVirtualDomPart {
    attributes?: Array<IAttribute>;
    classes?: Array<IClass>;
    events?: Array<IEvent>;
    nativeNode?: any;
    nodes?: Array<INode>;
    refresh?: (deps: any) => Promise<INode>;
    text?: string; // Used when Node is a text node.
}

export interface IRule {
    rendered?: boolean;
    selector: string;
    style: IStyle;
}

export interface IVirtualDomPart {
    deps?: any;
    name?: string;
    parent?: INode;
    shouldNotRender?: boolean;
}