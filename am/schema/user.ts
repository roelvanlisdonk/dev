import { StoreField, StoreObject } from '../libraries/am/storage/store';

export class User extends StoreObject {
    email: StoreField;

    constructor() {
        super();

        this.email = new StoreField();
        
    }
}

