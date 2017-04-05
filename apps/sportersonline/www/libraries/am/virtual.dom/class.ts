import { IPart, IPartFactory, IPartRenderer } from "./part";
import { IRule } from "./rule";
import { IStyle } from "./style";

/**
 * Creat a IClass by merging the given styles.
 */
export function createClass(name:string, ...styles:Array<IStyle>): IClass {
    if(!name) { throw new Error("Please provide name."); }
    if(!styles || !styles.length) { throw new Error("Please provide styles."); }

    let mergedStyles: IStyle = {};
    const total: number = styles.length;
    for(let i = 0;i < total; i++) {
        const style: IStyle = styles[i];
        mergedStyles = Object.assign(mergedStyles, style);
    }

    return {
        name,
        selector: `.${name}`,
        style: mergedStyles
    };
}

export interface IClass extends IPart, IRule {
    name: string;
    selector: string;
    style: IStyle;
}

export interface IClassFactory extends IPartFactory {
    (input: any): IClass | Array<IClass>;
}

export interface IClassRenderer extends IPartRenderer {
    render: IClass | IClassFactory;
    when: any;
}