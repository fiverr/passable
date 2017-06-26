import expectType from '../../helpers/expect_type';
import isType from '../../helpers/is_type';

function isNumber(value, expect) {
    expectType(expect, 'boolean', 'isNumber');
    return isType(value, 'number', expect);
}

export default isNumber;