import { isType, expectType } from '../../helpers';

function isNumber(value, expect) {
    expectType(expect, 'boolean', 'isNumber');
    return isType(value, 'number', expect);
}

export default isNumber;