// @flow
import { expectType, getSize } from '../../helpers';

function isEmpty(value: mixed, expect: boolean): boolean {
    expectType(expect, 'boolean', 'isEmpty');

    return (getSize(value) === 0) === expect;
};

export default isEmpty;