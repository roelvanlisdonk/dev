
export function run() {
    console.log("test runner started.");

    window.setTimeout(logMessage, 2000);
}

function logMessage() {
  console.log("That was really slow!");
}



export interface IObservable {
    actions: Array<(x:any) => any>;
}

run();