/**
 * This module should not be used directly.
 * It will only be used by the store.
 * It is created as a seperate module, to allow for hot reloading.
 */

export type IBasicType = boolean | Date | number | string;

interface IFields {
    [index: string]: IStoreField<IStoreFieldValue>;
}
export const fields: IFields = {};

interface IItems {
    [index: string]: IStoreItem;
}

export interface IStoreField<T extends IStoreFieldValue> extends IStoreItem {
    previousValue?: T;
    value: T;
}

export type IStoreFieldValue = Array<IBasicType> | IBasicType;

export interface IStoreItem {
    storeId?: string;
}

export interface ISubscriber {
    fn: (field: IStoreField<IStoreFieldValue>) => void;
    token: number;
}

export const items: IItems = {};

export const root: IStoreItem = {
    storeId: ""
};

export const counters = {
    storeId: 0
} 