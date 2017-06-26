import expectType from '../../helpers/expect_type';
import isType from '../../helpers/is_type';

function isArray(value, expect) {
    expectType(expect, 'boolean', 'isArray');
    return isType(value, 'array', expect);
}

export default isArray;