// @flow

import expectType from '../../../helpers/expect_type';

function isNumeric(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isNumeric');

    const result: boolean = !isNaN(parseFloat(value)) && !isNaN(Number(value)) && isFinite(value);
    return result === expect;
}

isNumeric.negativeForm = 'isNotNumeric';

export default isNumeric;