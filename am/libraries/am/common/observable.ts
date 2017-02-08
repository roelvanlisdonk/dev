
/**
 * Observable used in virtual dom and in the store, to execute logic when a dependency changes.
 * TODO: StoreObject should extend the Observable class.
 * TODO: StoreField.value should use the function createObservableArray.
 */

export interface IChangeEvent {
    propertyName: string;
    newValue: any;
    oldValue: any;
}

export interface IObservable {
    deps: Array<IObservable>;
    onChange: (evt: IChangeEvent) => void;
}

export class Observable {
    deps: Array<IObservable> = [];
    onChange: (evt: IChangeEvent) => void;

    constructor() {
        const self: Observable = this;
        
        const onChangeHandlers: Array<(evt: IChangeEvent) => void> = [];
        function onChange(evt: IChangeEvent) {
            const handlersCount = onChangeHandlers.length;
            for (let i = 0, length = handlersCount; i < length; i++) {
                const handler = onChangeHandlers[i];
                handler(evt);
            }
        }

        // TODO: define property "deps" as an observable array, so when deps are added or removed, change  handlers can be added or removed.
        // Use the function createObservableArray to create an array that is observable.

        Object.defineProperty(self, 'onChange', {
            get: function () {
                return onChange;
            },
            set: function (handler: (evt: IChangeEvent) => void) {
                onChangeHandlers.push(handler);
            },
            enumerable: true
        });
    }
}