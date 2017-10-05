import { IStoreField, IStoreItem } from './store';

export interface IAccount extends IStoreItem {
    isAuthenticated: IStoreField<boolean>;
    name: IStoreField<string>;
    password: IStoreField<string>;
}

export interface IAppData {
    account: IAccount;
}