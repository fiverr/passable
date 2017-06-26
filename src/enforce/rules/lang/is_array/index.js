import { isType, expectType } from '../../helpers';

function isArray(value, expect) {
    expectType(expect, 'boolean', 'isArray');
    return isType(value, 'array', expect);
}

export default isArray;