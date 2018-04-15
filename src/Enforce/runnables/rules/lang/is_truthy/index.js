// @flow
import { expectType } from '../../helpers';

function isTruthy(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isTruthy');
    return !!value;
}

isTruthy.negativeForm = 'isFalsy';

export default isTruthy;