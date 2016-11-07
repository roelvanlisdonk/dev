
const index: any = {}; // Array<IStoreObject>


// To support renaming of types and fields, we expect objects in the store to be of type IStoreObject
// Fields of a IStoreObject can only be of type IStoreField (except for the readonly fields "id" and "typeId".

// Change the data stored localy to match the new type schema.
export function fixDataBasedOnSchemaChanges(types: Array<IStoreType>) {
    throw new Error('Not implemented exception.');
}

function cloneSimpleType(obj: any): any {
    let copy: any;

    // Handle boolean, number, string, null and undefined.
    // TODO: NaN.
    if (null == obj || "object" != typeof obj) { 
        return copy;
    };

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    throw new Error(`Unable to clone simple type. This is most likely cast by IStoreField.value containing In the curren version of the store, arrays can only have types (boolean, Date, number, string) and `);
}

export function get<T>(id: string): T {
    const obj: any = index[id];   

    // Only handle "typed" objects.
    if (obj instanceof Object && obj.id && obj.typeId) {
        const copy: any = {
            id: obj.id,
            typeId: obj.typeId
        };

        for (let propName in obj) {
            if (obj.hasOwnProperty(propName)) {
                const field: IStoreField = obj[propName];

                // Only handle IStoreField.
                if("object" === typeof field && field.fieldId) {
                    
                    const fieldCopy: IStoreField = {
                        fieldId: field.fieldId,
                        value: null
                    };

                    // Handle arrays.
                    if (field.value instanceof Array) {
                        const sourceArray = field.value;
                        let destArray: Array<string> = [];
                        for (let i = 0, len = sourceArray.length; i < len; i++) {
                            // Array items should be of simple types!.
                            destArray[i] = cloneSimpleType(sourceArray[i]); 
                        }
                        fieldCopy.value = destArray;
                    } else {
                        fieldCopy.value = cloneSimpleType(field.value);
                    }

                    copy[propName] = fieldCopy;
                }
            }
        }
        return copy;
    }

    throw new Error(`Unable to get store object ${id}! Its type isn't supported.`);
}

export interface IStoreType {
    readonly typeId: string; // Application wide unique id.
}

export interface IStoreObject extends IStoreType {
    readonly id: string; // Application wide unique id.
}

export interface IStoreField {
    readonly fieldId: string; // Application wide unique id.
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