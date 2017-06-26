import { expectType, getSize } from '../../helpers';

function isEmpty(value, expect) {
    expectType(expect, 'boolean', 'isEmpty');

    return (getSize(value) === 0) === expect;
};

export default isEmpty;