import { IStoreObject } from "../libraries/am/storage/store";
import { IUser } from "./User"

export interface IRoot extends IStoreObject {
    user?: IUser;
}