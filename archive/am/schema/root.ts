import { StoreField, StoreObject } from "../libraries/am/storage/store";
import { User } from "./User"

export class Root extends StoreObject {
    user = new User();
}