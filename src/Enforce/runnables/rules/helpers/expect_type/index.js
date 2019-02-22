// @flow

import { isType } from '../';

function expectType(value: AnyValue, type: string, functionName: string): true | void {
    if (!isType(value, type)) {
        const val: string = Array.isArray(value) ? JSON.stringify(value) : value;
        throw new TypeError(`[Passable]: Failed to execute '${functionName}': expected ${val} to be a ${type}.`);
    }

    return true;
}

export default expectType;
