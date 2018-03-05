// @flow

import { expectType } from '../../helpers';

function isNumeric(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isNumeric');

    const result: boolean = !isNaN(parseFloat(value)) && isFinite(value);
    return result === expect;
}

export default isNumeric;