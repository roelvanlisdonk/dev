# Schema
* The schema folder contains types files.
* The store can convert poco JavaScript objects to a StoreObjects, by using System.import and the typeId.


class Observable {
    constructor() {
        

        const _onChangeHandlers: Array<() => void> = [];
        function _onChange() {
            
            const changeHandlers = _onChangeHandlers;
            for(let i = 0, length = changeHandlers.length; i < length; i++) {
                const handler = changeHandlers[i];
                handler();
            }
        }
        Object.defineProperty(self, 'onChange', {
            get: function () { 
                return _onChange;
            },
            set: function(handler: () => void) {
                _onChangeHandlers.push(handler);       
            },
            enumerable: true
        }); 
    }
}


class StoreObject extends Observable {
    id: string;
    validationRules: Array<IValidationRule>;

    constructor() {
        const self: StoreObject = this;

        self.id = cuid();
    }
}


## User

class User extends StoreObject {
    firstName: StoreField;
}

