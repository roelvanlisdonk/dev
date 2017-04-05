import { IPart, IPartFactory, IPartRenderer } from "./part";
import { IRule, IRuleRenderer } from "./rule";

export interface IMedia extends IPart {
    rules: Array<IRule | IRuleRenderer>;
}

export interface IMediaFactory extends IPartFactory {
    (input: any): IMedia | Array<IMedia>;
}

export interface IMediaRenderer extends IPartRenderer {
    render: IMedia | IMediaFactory;
    when: any;
}