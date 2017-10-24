// @flow

import { isType } from '../';

function expectType(value: mixed, type: string, functionName: string): true | void {
    if (!isType(value, type, true)) {
        throw new TypeError(`${functionName}: expected ${value} to be a ${type}.`);
    }

    return true;
}

export default expectType;