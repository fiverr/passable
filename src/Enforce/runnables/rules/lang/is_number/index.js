// @flow

import expectType from '../../../helpers/expect_type';
import isType from '../../../helpers/is_type';

function isNumber(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isNumber');
    return isType(value, 'number') === expect;
}

isNumber.negativeForm = 'isNotNumber';

export default isNumber;