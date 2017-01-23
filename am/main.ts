import { clientStorage } from './am/services/local.storage';
import { StoreField, StoreObject } from './am/services/store';

// In v1 just store each StoreObject in store._index and sync this with localstorage per get and set.
// In v1 just use a serve datetime value to dertimine syncing.


// Add some test data to the local storage.

const testUser = new StoreObject();
testUser.id = "";

const testRoot = {
    user: new StoreObject()
};



export class Employee {
    private _fullName: string;

    get fullName(): string {
        console.log("fullname get!");
        return this._fullName;
    }

    set fullName(newName: string) {
        console.log("fullname set!");
    }
}

const employee = new Employee();
employee.fullName = "test";
const name2 = employee.fullName;