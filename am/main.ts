// import { clientStorage } from './am/services/local.storage';
// import { StoreField, StoreObject } from './am/services/store';

// In v1 just store each StoreObject in store._index and sync this with localstorage per get and set.
// In v1 just use a serve datetime value to dertimine syncing.


// Add some test data to the local storage.

// const testUser = new StoreObject();
// testUser.id = "";

// const testRoot = {
//     user: new StoreObject()
// };


let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }
}

const employee = new Employee();
employee.fullName = "Bob Smith";

const employeeAsString = JSON.stringify(employee);
console.log(employeeAsString);

const employeeAsObject = JSON.parse(employeeAsString);

const e2 = employee as any;
console.log(e2._fullName);


export const a = "";