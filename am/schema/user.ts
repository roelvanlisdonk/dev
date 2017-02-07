import { StoreField, StoreObject } from '../libraries/am/storage/store';

const sb = new StoreObject();

export class User extends StoreObject {
    authorizationToken = new StoreField<string>();
    email = new StoreField<string>();

    isAuthorized(): boolean {
        return Boolean(this.authorizationToken.value);
    }
}