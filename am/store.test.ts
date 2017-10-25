import { beEqualTo, given } from "./test.framework";
import { hasChanged } from './store';



function sum(...args: number[]): number {
    let result = 0;
    for(let i=0, length = args.length;i<length;i++) {
        result = result + args[i];
    }
    return result;
}

// Examples:
given(1,2,3,4).it(sum).should(beEqualTo, 10);
