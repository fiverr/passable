// @flow

import isType from '../../../helpers/is_type';

function isNumber(value: mixed): boolean {
    return Boolean(isType(value, 'number'));
}

isNumber.negativeForm = 'isNotNumber';

export default isNumber;