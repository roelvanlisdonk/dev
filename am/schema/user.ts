import { IStoreObject, IStoreStringField, registerType } from '../services/store'
export function userModule() {
    
}

export class User implements IStoreObject {
    id: string;
    email: IStoreStringField = {
        fieldId: "1",
        value: null
    };
    readonly typeId: string = "1";
}

registerType(User);