

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

// Each action added to the pipeline will get fired when the previous is done.
// When an action does not return an ITask the next action in the pipeline will directly be called,
// else the return task wil be executed
// The task can be excuted by running async.run(task); 
interface ITask<S> {
    state: S;
    actions: Array<(state: S) => void | ITask<S>>;
}

function app(): INode {
    const node = {
        name: "app"
    };

    return node;
}

function boot(componentFn: () => INode, element: HTMLElement): void {

}