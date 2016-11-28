/**
 * Based on https://github.com/ericelliott/cuid
 */

let c = 0;
const blockSize = 4;
const base = 36;
const discreteValues = Math.pow(base, blockSize);

function pad(str: string, size: number){
    return ('000000000' + str).slice(-size);
}

function randomBlock () {
  return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
}

function safeCounter () {
  c = c < discreteValues ? c : 0;
  return c++;
}

export function cuid(fingerprint:any): string {
    // Starting with a lowercase letter makes
    // it HTML element ID friendly.
    const letter = 'c';

    // timestamp
    // warning: this exposes the exact date and time
    // that the uid was created.
    const timestamp = (new Date().getTime()).toString(base);

    // Grab some more chars from Math.random()
    const random = randomBlock() + randomBlock();

    // Prevent same-machine collisions.
    const counter = pad(safeCounter().toString(base), blockSize);

    return letter + timestamp + counter + fingerprint + random;
}