# Observables

One of the most important things in the AM architecture, are observables.
They are used to detect changes in the store.
Changes in the store are reflected in the UI and synced to storage (localstorage and/or cloudstorage).



## Observable
By default only the onchange event of properties of an observable object, that are of type ObservableValue or ArrayObservable<T>, will trigger the onchange event of the observable.
You can set "onchangeSubscriptionType" = "all" to listen to all change events, including change event of array items and childs form childs from childs.
* onchange: () => any;

The onchange property is an accessor (getter / setter):
* Get: call all onchange event subscribers.
* Set: add the given function to the private list of onchange event subscribers.

You can subscribe multiple times to the onchange event, by setting the property to a event handler function.
E.g. 
user.name.onchange = () => { console.log('First onchange subscription'); };
user.name.onchange = () => { console.log('Second onchange subscription'); };


# ObservableDeps extends Observable
Is a multi value observable, it can have multiple dependencies ("deps").
When one of the deps change, all onchange subscribers will be called.
* deps: Array<Observable>

## ObservableValue extends Observable
Is a single value observable, it has only one dependency the "value" itself
* value: boolean | Date | number | string | null; // when changed all onchange subscribers will be called.


## ArrayObservable<T> extends Observable, Array<T>
When items are added to the array, removed from the array or the array is sorted, the onchange eventhandlers will be called.



