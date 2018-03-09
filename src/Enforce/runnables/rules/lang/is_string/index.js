// @flow
import { isType, expectType } from '../../helpers';

function isString(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isString');
    return isType(value, 'string') === expect;
}

isString.negativeForm = 'isNotString';

export default isString;