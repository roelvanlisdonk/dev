
const objectIndex: any = {}; // Array<IStoreObject>

// The typeId of a IStoreType is used as key.
// The values will be of type IStoreTypeIndexItem.
const typeIndex: any = {};

interface IStoreTypeIndexItem {
    // The fielId of a IStoreField is used as key.
    // The values will be of type IStoreField. 
    fieldIndex: any;
    value: IStoreType;
}

// To support renaming of types and fields, we expect objects in the store to be of type IStoreObject
// Fields of a IStoreObject can only be of type IStoreField (except for the readonly fields "id" and "typeId".

// This function converts the given type, so fields can be accessed fast.
export function addType() {
 
}


function cloneSimpleType(obj: any): any {
    let copy: any;

    // Handle boolean, number, string, null and undefined.
    if (null == obj || "object" != typeof obj) { 
        return copy;
    };

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    throw new Error("Unable to clone simple type.");
}

export function get<T>(id: string): T {
    const obj: any = objectIndex[id];   

    // Only handle "typed" objects.
    if (obj instanceof Object && obj.id && obj.typeId) {
        const copy: any = {
            id: obj.id,
            typeId: obj.typeId
        };

        const storeTypeIndexItem: IStoreTypeIndexItem = typeIndex[obj.typeId];
        const storeType = storeTypeIndexItem.value;

        for (let propName in obj) {
            if (obj.hasOwnProperty(propName)) {
                const field: IStoreField = obj[propName];

                // Only handle IStoreField.
                if("object" === typeof field && field.fieldId) {
                    
                    const fieldCopy: IStoreField = {
                        fieldId: field.fieldId,
                        value: null
                    };

                    // // TODO: Determine correct fieldName.
                    const fieldName = '';

                    // Handle IStoreField.value is of type 'Array'.
                    if (field.value instanceof Array) {
                        const sourceArray = field.value;
                        let destArray: Array<string> = [];
                        for (let i = 0, len = sourceArray.length; i < len; i++) {
                            destArray[i] = cloneSimpleType(sourceArray[i]); // Array items should be of simple types!.
                        }
                        fieldCopy.value = destArray;
                    } else {
                        fieldCopy.value = cloneSimpleType(field.value);
                    }

                    copy[fieldName] = fieldCopy;
                }
            }
        }
        return copy;
    }

    throw new Error(`Unable to get store object ${id}! Its type isn't supported.`);
}



export interface IStoreType {
    readonly typeId: string; // GUID
}

export interface IStoreObject extends IStoreType {
    readonly id: string; // GUID
}

export interface IStoreField {
    readonly fieldId: string; // GUID
    value: boolean | Date | number | string | Array<boolean | Date | number | string>;
}

export interface IStoreBooleanField extends IStoreField {
    value: boolean;
}

export interface IStoreDateField extends IStoreField {
    value: Date;
}

export interface IStoreNumberField extends IStoreField {
    value: number;
}

export interface IStoreStringField extends IStoreField {
    value: string;
}

export interface IStoreBooleanArrayField extends IStoreField {
    value: Array<boolean>;
}

export interface IStoreDateArrayField extends IStoreField {
    value: Array<Date>;
}

export interface IStoreNumberArrayField extends IStoreField {
    value: Array<number>;
}

export interface IStoreStringArrayField extends IStoreField {
    value: Array<string>;
}



// export interface IStoreArray extends IStoreObject {
//     id: string;
//     [position: number]: IStoreObject;
// }

// export interface IStoreDepenendcy {
//     deps: Array<IStoreDepenendcy>;
// }

// export interface IStoreField extends IStoreObject {
// 	fieldTypeId: string;
//     id: string;
// 	recordId: string;
//     value: boolean | Date | number | string;
// }

// export interface IStoreFnDepenendcy extends IStoreDepenendcy {
//     deps: Array<IStoreDepenendcy>;
//     fn: (...deps: Array<IStoreDepenendcy>) => any;
// }



// export interface IStoreRecord extends IStoreObject {
//     id: string;
// 	recordTypeId: string;
// }