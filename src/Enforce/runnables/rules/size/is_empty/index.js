// @flow
import expectType from '../../../helpers/expect_type';
import getSize from '../../../helpers/get_size';

function isEmpty(value: mixed, expect: boolean = true): boolean {
    expectType(expect, 'boolean', 'isEmpty');

    return (getSize(value) === 0) === expect;
};

isEmpty.negativeForm = 'isNotEmpty';

export default isEmpty;