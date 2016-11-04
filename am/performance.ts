
// NOTES (tested on chrome 54)
// - When you add an existing object to 2 arrays, you get the size of one.
// - It does not matter (time and memory) if you add objects to an object or push to an array.
// - Iterating over 1.000.000 keys in an object, takes 200ms.
// - Iterating an array of 1.000.000 objects, takes 2ms (100x faster).
// - Direct acces of an property in an object, takes 0.02ms (100x faster).

// Conclusions
// - Store all IStoreObjects, on one big object index, for direct access
// - Use arrays as indexes, that refer to the objects on the object index, when you want to loop and group.
// e.g.
// - objectIndex is an object and contains all objects.
// - typeIndex is an object that contains keys foreach type.
//      each values contains an array of references to the objects on the objectIndex of type x.
// So now we can always access objects directly by its id, but we can also get all objects of type x.



const questionsAsObject: any = {};
const questionsAsArray: Array<IQuestion> = [];

function addQuestionToArray(id: number) {
    const question: IQuestion = {
        id: id.toString(),
        question: "Dit is een best wel lange vraag met wat data, The returned value represents the time elapsed since the time origin (the PerformanceTiming.navigationStart property). In a web worker, the time origin is the time that its execution context (e.g. thread or process) is created. In a window, it is the time that the user navigated (or confirmed navigation, if confirmation was needed) to the current document. Bear in mind the following point" + id.toString()
    };
    questionsAsArray.push(question);
}

function addQuestionToObject(id: number) {
    const question: IQuestion = {
        id: id.toString(),
        question: "Dit is een best wel lange vraag met wat data, The returned value represents the time elapsed since the time origin (the PerformanceTiming.navigationStart property). In a web worker, the time origin is the time that its execution context (e.g. thread or process) is created. In a window, it is the time that the user navigated (or confirmed navigation, if confirmation was needed) to the current document. Bear in mind the following point" + id.toString()
    };
    questionsAsObject[id] = question;
}

export function start() {
    for(let i = 0, length = 1000000; i < length; i++) {
        addQuestionToArray(i);
    }

    for(let i = 0, length = 1000000; i < length; i++) {
        const question: IQuestion = questionsAsArray[i];
        questionsAsObject[i.toString()] = question;
    }

    const t0 = performance.now();
    
    

    // Loop array
    // for(let i = 0, length = 1000000; i < length; i++) {
    //     const question: IQuestion = questionsAsArray[i];
    // }

    // Loop object
    for (let prop in questionsAsObject) {
        if(questionsAsObject.hasOwnProperty(prop)){
            const question: IQuestion = questionsAsObject[prop];
        }
    }

    // direct access
    //const question: IQuestion = questionsAsObject["999999"];
    
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
}
start();

export interface IQuestion {
    id: string;
    question: string;
}
