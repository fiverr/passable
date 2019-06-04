// @flow
import expectType from '../../../helpers/expect_type';

function isTruthy(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isTruthy');
    return !!value;
}

isTruthy.negativeForm = 'isFalsy';

export default isTruthy;