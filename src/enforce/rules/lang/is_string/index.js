import { isType, expectType } from '../../helpers';

function isString(value, expect) {
    expectType(expect, 'boolean', 'isString');
    return isType(value, 'string', expect);
}

export default isString;