// @flow

import { isType } from '../';
import { throwRuntimeError } from 'Helpers';
import { Errors } from 'Constants';

function expectType(value: AnyValue, type: string, functionName: string): true | void {
    if (!isType(value, type, true)) {
        return throwRuntimeError(Errors.EXPECT_TYPE_FAILURE, functionName, value, type);
    }

    return true;
}

export default expectType;
