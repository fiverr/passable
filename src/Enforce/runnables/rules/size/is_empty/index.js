// @flow
import { expectType, getSize } from '../../helpers';

function isEmpty(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isEmpty');

    return (getSize(value) === 0) === expect;
};

isEmpty.negativeForm = 'isNotEmpty';

export default isEmpty;