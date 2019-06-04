// @flow
import expectType from '../../../helpers/expect_type';
import isType from '../../../helpers/is_type';

function isArray(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isArray');
    return isType(value, 'array') === expect;
}

isArray.negativeForm = 'isNotArray';

export default isArray;