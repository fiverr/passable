import expectType from '../../helpers/expect_type';
import isType from '../../helpers/is_type';

function isString(value, expect) {
    expectType(expect, 'boolean', 'isString');
    return isType(value, 'string', expect);
}

export default isString;