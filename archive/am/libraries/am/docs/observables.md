
# Observables
One of the most important things in the AM architecture, are observables.
They are used to detect changes in the store.
Changes in the store are reflected in the UI and synced to storage (localstorage and/or cloudstorage).



## Observable


### onchange
You can subscribe multiple times to the onchange event, by setting the property to a event handler function.
E.g. user.name.onchange = () => { console.log('First onchange subscription'); };
     user.name.onchange = () => { console.log('Second onchange subscription'); };
     
* onchange: () => any;
    * Get: when the onchange function is called, it will notify all event subscribers.
    * Set: add the given function to the private list of onchange event subscribers.




# ObservableDeps extends Observable
Is a multi value observable, it can have multiple dependencies ("deps").
When one of the deps change, all onchange subscribers will be called.
* deps: Array<Observable>

## ObservableValue extends Observable
Is a single value observable, it has only one dependency the "value" itself
* value: boolean | Date | number | string | null; // when changed all onchange subscribers will be called.


## ArrayObservable<T> extends Observable, Array<T>
When items are added to the array, removed from the array or the array is sorted, the onchange eventhandlers will be called.



