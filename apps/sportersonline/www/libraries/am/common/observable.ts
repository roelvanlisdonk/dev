import { remove } from "./array/remove";
import { isObject } from "./validation/is.object";

export enum Traverse {
    no = 0,
    shallow = 1,
    full = 2
}

/**
 * Add a listener to the given observable.
 * When deep is true, the listener will be added to all IObservable objects in the object tree of the given IObservable. 
 */
export function addListener(observable: IObservable, listener: IListener, traverse: Traverse = Traverse.no) {
    if(!observable) { throw new Error("Please provide observable."); }
    if(!listener) { throw new Error("Please provide listener."); }

    if(traverse === Traverse.full || traverse === Traverse.shallow) {
        const keys = Object.keys(observable);
        const keyCount = keys.length;
        for (let i = 0; i < keyCount; i++) {
            const key = keys[i];
            const item = (observable as any)[key];
            if(item._listeners) {
                item._listeners.push(listener);
            }

            if(traverse === Traverse.full) {
                addListener(item, listener, traverse);
            }
        }
    }

    if(observable._listeners) {
        observable._listeners.push(listener);
    }
}

export function isObservable(input: any): boolean {
    return isObject(input) && Boolean(input._listeners);
}

export function not(observable: IObservableField<boolean>): IObservableNot {
    return { not: observable };
}

export function notify(observable: IObservable) {
    if(!observable) { throw new Error("Please provide observable."); }
    if(!observable._listeners) { throw new Error("Please provide observable._listeners."); }
    
    // Create a copy of the listeners array, because during the for loop the array might change.
    const listeners = observable._listeners.slice();
    if(!listeners) { return; }

    const total = listeners.length;
    for (let i = 0; i < total; i++) {
        const listener = listeners[i];
        const evt: IChangeEvent = {
            listener: listener,
            source: observable
        }
        listener.fn(evt);
    }
}

export function removeListener(observable: IObservable, listener: IListener, traverse: Traverse = Traverse.no) {
    if(!observable) { throw new Error("Please provide observable."); }
    if(!listener) { throw new Error("Please provide listener."); }
    
    if(Traverse.full || Traverse.shallow) {
        const keys = Object.keys(observable);
        const keyCount = keys.length;
        for (let i = 0; i < keyCount; i++) {
            const key = keys[i];
            const item = (observable as any)[key];
            if(item._listeners) {
                remove(item._listeners, listener);
            }

            if(Traverse.full) {
                removeListener(item, listener, traverse);
            }
        }
    }

    if(observable._listeners) {
        remove(observable._listeners, listener);
    }
    
}

export interface IChangeEvent {
    listener: IListener;
    source: IObservable;
}

export interface IListener {
    fn: (evt: IChangeEvent) => void;
    state?: any; 
}

export interface IObservable {
    _listeners?: Array<IListener>;
}

export interface IObservableField<T> extends IObservable {
    _prevValue?: T;
    value: T;
}

export interface IObservableNot {
    not: IObservableField<boolean>;
}

/**
 * When one of the IObservable objects in the input object tree changes, the fn will be called.
 */
export interface IObservableFn<TResult, TInput> { 
    fn: (input?: TInput) => TResult; 
    input?: TInput;
    traverse?: Traverse;
}

export interface IObservableNot {
    
}