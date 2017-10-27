// @flow

import { isType } from '../';
import { throwRuntimeError } from 'Helpers';

function expectType(value: AnyValue, type: string, functionName: string): true | void {
    if (!isType(value, type, true)) {
        return throwRuntimeError('2', functionName, value, type);
    }

    return true;
}

export default expectType;
