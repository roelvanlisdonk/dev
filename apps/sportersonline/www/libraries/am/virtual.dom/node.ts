import { IPart, IPartFactory, IPartRenderer } from "./part";
import { IAttribute, IAttributeRenderer } from "./attribute";
import { IClass, IClassRenderer } from "./class";
import { IEvent, IEventRenderer } from "./event";
import { IMedia, IMediaRenderer } from "./media";
import { IRule, IRuleRenderer } from "./rule";

export interface INodeFactory extends IPartFactory
{
    (input: any): INode | Array<INode | INodeRenderer>;
}

export interface INode extends IPart {
    attributes?: Array<IAttribute | IAttributeRenderer>;
    classes?: Array<IClass | IClassRenderer>;
    isSvg?: boolean; // True when element is svg or a child. TODO: rename to ns and set it to the svg ns when it should be svg.
    events?: Array<IEvent | IEventRenderer>;
    media?: Array<IMedia | IMediaRenderer>;
    name?: string;
    nativeNode?: any;
    nodes?: Array<INode| INodeRenderer>;
    parentNode?: INode| INodeRenderer;
    parentNodeChildIndex?: number;
}

/**
 * You should read the properties on this object like:
 * (re)render x when y changes.
 */
export interface INodeRenderer extends IPartRenderer, INode
{
    render: INode | INodeFactory; // x
    when: any; // y
}

