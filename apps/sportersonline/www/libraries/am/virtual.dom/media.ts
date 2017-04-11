import { IRule } from "./rule";

export interface IMedia {
    name: string;
    query: string;
    rules: Array<IRule>;
}