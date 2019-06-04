// @flow
import expectType from '../../../helpers/expect_type';
import isType from '../../../helpers/is_type';

function isString(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isString');
    return isType(value, 'string') === expect;
}

isString.negativeForm = 'isNotString';

export default isString;