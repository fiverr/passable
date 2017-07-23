// @flow
import { isType, expectType } from '../../helpers';

function isArray(value: mixed, expect: boolean): boolean {
    expectType(expect, 'boolean', 'isArray');
    return isType(value, 'array', expect);
}

export default isArray;