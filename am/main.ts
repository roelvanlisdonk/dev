import { StoreField, StoreObject } from './libraries/am/storage/store';
import { get } from './libraries/am/common/http';
 

const sf = new StoreField();


function checkLocation() {
    console.log(sf.id);

    get('http://localhost:8080?id=555');
}



checkLocation();





// In v1 just store each StoreObject in store._index and sync this with localstorage per get and set.
// In v1 just use a serve datetime value to dertimine syncing.


// Add resources to .

// const testUser = new StoreObject();
// testUser.id = "";

// const testRoot = {
//     user: new StoreObject()
// };


// let passcode = "secret passcode";

// class Employee {
//     private _fullName: string;

//     get fullName(): string {
//         return this._fullName;
//     }

//     set fullName(newName: string) {
//         this._fullName = newName;
//     }
// }

// const employee = new Employee();
// employee.fullName = "Bob Smith";

// const employeeAsString = JSON.stringify(employee);
// console.log(employeeAsString);

// const employeeAsObject = JSON.parse(employeeAsString);

// const e2 = employee as any;
// console.log(e2._fullName);


// // Extrends IStoreField, so it can be used as dep
// export interface IResource {
//     en?: string;
//     nl?: string;
//     value?: string;
// }

// class AmResources {

// }

// class Resources extends AmResources {
//     ok: IResource = { en: 'ok', nl: 'ok'}  
// }
// const resources = new Resources();


// const calculatedText = { deps:[resources.ok], onchange: () => { return resources.ok + ' test'; }};

/*

function getFullName(firstName: ObservableValue, lastName: ObservableValue) {
    return {
        deps:[firstName, lastName],
        onchange: () => { `${firstName} ${lastName}` };
    }
}



// Colors and images should be
const myDiv = overwriteClass()

export okButtonClass: string = addClass('ok-button', { width: 100px; });


export class ActionButton {
    
}

export class ActionButtonOptions {
    borderColor: string;
    background
}

// Now other modules can use this class to overwrite is or any other elements in it.

const okButtonClass = {
    selector: `${}`
    width: 100px;
};

const div: any = {
    // attrs are of type Observable
    attrs: {
        classes: [],            // Will be converted to an ObservableArray<T> during initial rendering, when it is not an ObservableArray<T>
        description: getFullName(user.firstName, user.lastName),
        title: resources.ok     // When the resource.locale changes, just rerender ui.
    },
    events: {
        onclick: () => {} // When the dom click event is fired, the given onclick eventhandler will be called.
    },
    nativeNode: HtmlDivElement, when 
    nodes: [
        text(resources.ok),
        actionButton(resources.ok),
        actionButton(resources.cancel)
    ] // Observable array when items are added removed or ordered after the first rendering, the div will rerender.
}




*/





export const a = "";