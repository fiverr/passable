// @flow

import { isType } from '../';

function throwTypeError(value: any, type: string, functionName: string): void {
    throw new TypeError(`${functionName}: expected ${value} to be a ${type}.`);
}

function expectType(value: any, type: string, functionName: string): true | void {
    if (!isType(value, type, true)) {
        return throwTypeError(value, type, functionName);
    }

    return true;
}

export default expectType;