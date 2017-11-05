// @flow

import { isType } from '../';
import { runtimeError } from 'Helpers';
import { Errors } from 'Constants';

function expectType(value: AnyValue, type: string, functionName: string): true | void {
    if (!isType(value, type, true)) {
        throw runtimeError(Errors.EXPECT_TYPE_FAILURE, functionName, value, type);
    }

    return true;
}

export default expectType;
