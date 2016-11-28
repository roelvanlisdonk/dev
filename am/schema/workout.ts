import { IStoreObject, IStoreStringField, registerType } from '../services/store'

export class Workout implements IStoreObject {
    id: string;
    readonly typeId: string = "2";
    name: IStoreStringField = {
        fieldId: "1",
        value: null
    };
}

registerType(Workout);