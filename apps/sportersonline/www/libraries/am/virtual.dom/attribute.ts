import { IObservableField, IObservableFn } from "../common/observable";

export interface IAttribute {
    name: string;
    // When null attribute will not be rendered, when empty string only, attribute name will be rendered.
    value?: string | IObservableField<string> | IObservableFn<any, string>;
}
