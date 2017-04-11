import { IObservable, IObservableField, IObservableFn, IObservableNot } from "../common/observable";

type IWhen = IObservable | IObservableField<boolean> | IObservableFn<any, boolean> | IObservableNot;

/**
 * You should read the properties "render" and "when" as: (re)render x when y changes.
 */
export interface IPartRenderer<T> {
    render: (input: IWhen) => T;
    renderResult?: T;
    when: IWhen;
}

/**
 * You should read the properties "render" and "when" as: (re)render x when y changes.
 */
export interface IPartsRenderer<T> {
    render: (input: IWhen) => Array<T | IPartRenderer<T> | IPartsRenderer<T>>;
    renderResult?: Array<T | IPartRenderer<T> | IPartsRenderer<T>>; // When the render functions is executed the result will be stored in "renderResult", so when the parts are re-rendered, the previous parts can be removed.
    when: IWhen;
}
