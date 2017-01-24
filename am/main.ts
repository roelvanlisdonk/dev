// import { clientStorage } from './am/services/local.storage';
// import { StoreField, StoreObject } from './am/services/store';

// In v1 just store each StoreObject in store._index and sync this with localstorage per get and set.
// In v1 just use a serve datetime value to dertimine syncing.


// Add resources to .

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


// Extrends IStoreField, so it can be used as dep
export interface IResource {
    en?: string;
    nl?: string;
    value?: string;
}

class AmResources {

}

class Resources extends AmResources {
    ok: IResource = { en: 'ok', nl: 'ok'}  
}
const resources = new Resources();


const calculatedText = { deps:[resources.ok], onchange: () => { return resources.ok + ' test'; }};

// const div: any = {
//     attrs: {
//         classes: [],
//         title: resources.ok,
//     },
//     events: {
//         onclick: () => {}
//     },
//     nodes: [
//         titleText,
//         okButton
//         cancelButton 
//     ]
// }

/*

const user;

const div = {
    attrs: { classes: [] },
    
    text: resources.ok,
    text: vd.text([resources.ok], onchange: () => { return resources.ok + ' test'; })
    div: {},
    div: {},
    button: {
        type: '';
    }
}


*/



// These resources can now be used as deps, so when the main user language changes, the ui changes.
// const resources = new Resources();

// const vd: any = {};
// const div: any = {
//     nodes: [
//         { deps: [resources.ok], onchange: () => { return resources.ok + ' test'; }},
//         vd.text(resources.ok)

//     ]
// };
// const div = vd.div([],[
//  vd.text(resources.ok)
// ]);
// const textNode = vd.text(resources.ok)
// const textNode = vd.text([resources.ok],() => { return resources.ok + ' test'; })
// addResources(resources);

// class resources

// const resources = new Resource(){
//     ok: addResource({ en: 'ok', nl: 'ok'})
// };


// const b = resources.ok

export const a = "";