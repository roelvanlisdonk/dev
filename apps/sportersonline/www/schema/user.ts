import { IStoreField, IStoreObject } from '../libraries/am/storage/store';

export interface IUser extends IStoreObject {
    authorizationToken: IStoreField<string>;
    email: IStoreField<string>;
    isAuthorized: IStoreField<boolean>;
}