
// - Create afterAll(tasks: Array<IAsyncTask>, fn: IAfterAllFn): IAsyncTask
// - Create abort(task: IAsyncTask);
// - Create abortAll(tasks: Array<IAsyncTask>);


export type IAbortFn = () => void;
export type IAfterFn = (error: Error, data?: any, state?: any) => void;

export interface IAsyncTask {
    abort: Array<IAbortFn>;
    after: Array<IAfterFn>;
    data: any;
    done: boolean;
    error: Error;
    state: any;
}

export function after(task: IAsyncTask, fn: IAfterFn): IAsyncTask {
    task.after = task.after || [];
    task.after.push(fn);
    if(task.done) {
        const total = task.after.length;
        for (let i = 0; i < total; i++) {
            const after = task.after[i];
            after(task.error, task.data, task.state);
        }
    }

    return task;
}
