

console.log("dit is een test");

interface IAttribute {
    name: string;
    value?: string;
}

interface IWAttribute<W> extends IAttribute {
    name: string;
    render: () => IWAttribute<W>;
    value?: string;
    when: W;
}

interface IWSAttribute<W, S> extends IWAttribute<W> {
    name: string;
    render: () => IWAttribute<W>;
    state: S;
    value?: string;
    when: W;
}

interface INode {
    name: string;
}

interface IWNode<W> extends INode {
    name: string;
    render: () => IWNode<W>;
    when: W;
}

interface IWSNode<W, S> extends IWNode<W> {
    name: string;
    render: () => IWSNode<W, S>;
    state: S;
    when: W;
}


// Pipeline
// A pipeline is an class of a specific type
// This type resambles the type of the input of the next register call.

class Pipeline {

}

// 53 euro oplader
// 


// class Pipeline<T> {
//     constructor(pipeline?: any) {

//     }

//     register(next: any) {

//     }


//     registerWithInput<T>(next: any, input?: any) {

//     }
// }

// const pipeline = new Pipeline();
// pipeline
//  .register(httpget, httpOptions)
//  .register(map, mapper) // mapper has a mapper.fn and a mapper.additionalInput, passed to mapper.fn
//  .subscribe(showresult, additionalInput?)

//  .unsubscrive(showresult)
//  .destroy

// Because each register call returns a new pipeline, the types of the next register, subscribe, unsubscribe methods are known.
// Second parameter is always some extra input that is passed to the function
// Allow multiple subscriptions
// Allow mulitple unsubscriptions
// .destroy - cancels all events en unsubscribes all events.



// Render
// Result of a render function can be an IVirtualDomPart or an task
// The task should call next() supplying the generated virtual dom task
// This way components can load data or load components asynchronous

function app(): INode {
    const node = {
        name: "app"
    };

    return node;
}

function boot(componentFn: () => INode, element: HTMLElement): void {

}