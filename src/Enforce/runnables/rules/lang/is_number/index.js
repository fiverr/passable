// @flow

import { isType, expectType } from '../../helpers';

function isNumber(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isNumber');
    return isType(value, 'number') === expect;
}

isNumber.negativeForm = 'isNotNumber';

export default isNumber;