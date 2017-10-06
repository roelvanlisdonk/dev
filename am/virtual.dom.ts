import { IStoreField } from './store';
import { IStyle } from './style';

// In this version, change detection is based on IStoreField changes.


export function getRefreshedVirtualDomPart(part: IVirtualDomPart): IVirtualDomPart {
    const deps = part.deps;
    const refresh = part.refresh;

    if(deps && refresh) {
        return refresh(part.deps);
    }
    
    return part;
}

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
    nodes?: Array<INode | string | IStoreField<string>> | INodes;
}

/**
 * Can be used, when you want to only change the child nodes, when some data changes.
 */
export interface INodes extends IVirtualDomPart
{
    nodes?: Array<INode | string | IStoreField<string>>;
    refresh?: (deps: any) => INodes;
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
    refresh?: (deps: any) => IVirtualDomPart;
    shouldNotRender?: boolean;
}