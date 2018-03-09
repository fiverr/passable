// @flow
import { isType, expectType } from '../../helpers';

function isArray(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isArray');
    return isType(value, 'array') === expect;
}

isArray.negativeForm = 'isNotArray';

export default isArray;