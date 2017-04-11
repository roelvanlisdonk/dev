import { IRule } from "./rule";
import { IStyle } from "./style";

/**
 * Creat a IClass by merging the given styles.
 */
// export function createClass(name:string, ...styles:Array<IStyle>): IClass {
//     if(!name) { throw new Error("Please provide name."); }
//     if(!styles || !styles.length) { throw new Error("Please provide styles."); }

//     let mergedStyles: IStyle = {};
//     const total: number = styles.length;
//     for(let i = 0;i < total; i++) {
//         const style: IStyle = styles[i];
//         mergedStyles = Object.assign(mergedStyles, style);
//     }

//     return {
//         name,
//         style: mergedStyles
//     };
// }

export interface IClass {
    name: string;
    style: IStyle;
}