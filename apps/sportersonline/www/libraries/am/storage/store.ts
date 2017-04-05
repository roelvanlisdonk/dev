import { IObservable, IObservableField, notify } from "../common/observable";
import { cuid } from "../common/cuid";
import { isArray } from "../common/validation/is.array"
import { clientStorage } from "./local.storage";
import _data = am.store.data;

const rootId = "am.root";

function getObjectFromLocalStorage<T extends IStoreObject>(id: string): T {
    if(!id) { throw new Error("Please provide id."); }

    const json = clientStorage.getItem(id);
    return JSON.parse(json);
}

export function getRoot<T extends IStoreObject>(): T {
    // Check if root exists in memory.
    let root: T = (_data as any)[rootId];
    if (root) { return root; }

    // Check if root exists in local storage
    root = getObjectFromLocalStorage<T>(rootId);
    if (root) {
        (_data as any)[rootId] = root;
        return root;
    }

    // Root not found.
    return null;
}

export function setRoot<T extends IStoreObject>(root: T): void {
    (_data as any)[rootId] = root;
}

/**
 * This function is used to sync store changes to cloud storage.
 * Each change to the store is saved to local or cloud storage (based on the app schema),
 * Changes are immediately saved to local storage and batches for sync with cloud storage.
 * When this function is called the cloud storage will directly sync to cloud storage.
 */
export function save(storeObject: IStoreObject) {
    notify(storeObject);
}

export enum SyncType {
    memory = 1, // Store object only in memory.
    local,      // Store object in memory and local storage.
    cloud       // Store object in memory, local storage and cloud storage.
}

export interface IStoreObject extends IObservable {
    id?: string;            // Unique id in the store, will be set, when it is first saved to the store.
    syncType?: SyncType;    // Default is [SyncType.memory].
}

export interface IStoreField<T extends boolean | number | Date | string | Array<IStoreObject>> extends IStoreObject, IObservableField<T> {
    _prevValue?: T;
    value: T;
}