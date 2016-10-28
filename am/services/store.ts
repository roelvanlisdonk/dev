
export interface IStoreArray extends IStoreObject {
    deps: Array<IStoreDepenendcy>;
    id: string; // GUID
}

export interface IStoreDepenendcy {
    deps: Array<IStoreDepenendcy>;
}

export interface IStoreField extends IStoreObject {
	deps: Array<IStoreObject>;
	fieldTypeId: string; // GUID
    id: string; // GUID
	recordId: string; // GUID
    value: boolean | Date | number | string;
}

export interface IStoreFnDepenendcy extends IStoreDepenendcy {
    deps: Array<IStoreDepenendcy>;
    fn: (...deps: Array<IStoreDepenendcy>) => any;
}

export interface IStoreObject extends IStoreDepenendcy {
    deps: Array<IStoreDepenendcy>;
    id: string; // GUID
}

export interface IStoreRecord extends IStoreObject {
	deps: Array<IStoreObject>;
    id: string; // GUID
	recordTypeId: string; // GUID
    // Field1
    // Feild2
    // ...
}