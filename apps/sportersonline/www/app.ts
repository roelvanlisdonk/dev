

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

// A ITask is just a function with 3 parameters
// - input (the initial input or the result of the previous task)
// - state (some state that is passed from task to taks, contains error message en cancelation tokens)
// - next (the next task to execute)
// Task kan be executed by using the run or runInParallel functions
// run(tasks, input, state)
// runOnFirst(tasks, input, state, fn)




function app(): INode {
    const node = {
        name: "app"
    };

    return node;
}

function boot(componentFn: () => INode, element: HTMLElement): void {

}