// @flow

import { isType } from '../';
import { runtimeError } from '../../../../../helpers/';
import { Errors } from '../../../../../constants';

function expectType(value: AnyValue, type: string, functionName: string): true | void {
    if (!isType(value, type)) {
        throw runtimeError(Errors.EXPECT_TYPE_FAILURE, functionName, value, type);
    }

    return true;
}

export default expectType;
