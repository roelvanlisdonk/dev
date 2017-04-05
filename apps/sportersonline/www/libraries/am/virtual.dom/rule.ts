import { IPart, IPartFactory, IPartRenderer } from "./part";
import { IStyle } from "./style";

export interface IRule extends IPart {
    selector: string;
    style: IStyle;
}

export interface IRuleFactory extends IPartFactory {
    (input: any): IRule | Array<IRule>;
}

export interface IRuleRenderer extends IPartRenderer {
    render: IRule | IRuleFactory;
    when: any;
}