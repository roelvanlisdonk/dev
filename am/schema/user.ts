import { StoreField, StoreObject } from '../am/services/store';

export class User extends StoreObject {
    email: StoreField;

    constructor() {
        super();

        this.email = new StoreField();
        
    }
}

