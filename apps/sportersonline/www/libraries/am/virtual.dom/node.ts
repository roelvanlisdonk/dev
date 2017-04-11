import { IPartRenderer, IPartsRenderer } from "./part";
import { IAttribute } from "./attribute";
import { IClass } from "./class";
import { IEvent } from "./event";
import { IMedia } from "./media";
import { IRule } from "./rule";
import { IStyle } from "./style";

/**
 * Properties Will be merged with the rendered node.
 */
export interface INodeRenderer extends IPartRenderer<INode> {
    attributes?: Array<IAttribute | IPartRenderer<IAttribute> | IPartsRenderer<IAttribute>>;     
    classe?: Array<IClass | IPartRenderer<IClass> | IPartsRenderer<IClass>>;               
    events?: Array<IEvent | IPartRenderer<IEvent> | IPartsRenderer<IEvent>>;                
    media?: Array<IMedia | IPartRenderer<IMedia> | IPartsRenderer<IMedia>>;                 
    rules?: Array<IRule | IPartRenderer<IRule> | IPartsRenderer<IRule>>;                    
    styles?: Array<IStyle | IPartRenderer<IStyle> | IPartsRenderer<IStyle>>;                
}

export interface INode {
    attributes?: Array<IAttribute | IPartRenderer<IAttribute> | IPartsRenderer<IAttribute>>;
    classes?: Array<IClass | IPartRenderer<IClass> | IPartsRenderer<IClass>>;
    isSvg?: boolean; // TODO: rename to ns and set it to the svg ns when it should be svg.
    events?: Array<IEvent | IPartRenderer<IEvent> | IPartsRenderer<IEvent>>;
    media?: Array<IMedia | IPartRenderer<IMedia> | IPartsRenderer<IMedia>>;
    name?: string;
    nativeNode?: any;
    nodes?: Array<INode| INodeRenderer | IPartsRenderer<INode>>;
    parentNode?: INode;
    parentNodeChildIndex?: number;
    rules?: Array<IRule | IPartRenderer<IRule> | IPartsRenderer<IRule>>;
    styles?: Array<IStyle | IPartRenderer<IStyle> | IPartsRenderer<IStyle>>;
}
