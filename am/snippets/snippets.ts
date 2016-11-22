

export function forLoop() {

    for(let i = 0, length = 100; i < length; i++) {
        
    }

}

export function performanceTiming(){

    const t0 = performance.now();
    // doSomething();
    const t1 = performance.now();
    console.log(`Call to doSomething took $(t1 - t0) milliseconds.`);
    
}


// Jasmine unit test.
// namespace unittests {
//     'use strict';

//     describe('zvdz.helpers.repl', function () {
//         it('should just execute this test to support adhoc TDD.', function () {
//             const subject = null;
//             const actual = null;
//             const expected = null;

//             expect(actual).toEqual(expected);
//         });
//     });
// }