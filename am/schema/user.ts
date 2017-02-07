import { StoreField, StoreObject } from '../libraries/am/storage/store';

export class User extends StoreObject {
    test: string = "";
    email: string;

    constructor() {
        super();

        this.email = "email from constructor";
    }
}

