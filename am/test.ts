

function areEqual(actual: any, expected: any) {
    if(actual !== expected) {
        console.log(`actual [$actual] is not equal to expected [$expected].`);
    }
}

export const assert = {
    areEqual: areEqual
}