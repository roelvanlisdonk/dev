/**
 * This module should not be used directly.
 * It will only be used by the store.
 * It is created as a seperate module, to allow for hot reloading.
 */

export type IBasicType = boolean | Date | number | string;
export type IStoreFieldValue = Array<IBasicType> | IBasicType;

export interface IStoreField<T extends IStoreFieldValue> extends IStoreItem {
    value: T; 
}

interface IFields {
    [index: string]: IStoreField<IStoreFieldValue>;
}
export const fields: IFields = {};

export interface IStoreItem {
    id: string;
}
interface IItems {
    [index: string]: IStoreItem;
}
export const items: IItems = {};
