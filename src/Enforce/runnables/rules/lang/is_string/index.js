// @flow

import isType from '../../../helpers/is_type';

function isString(value: mixed): boolean {
    return Boolean(isType(value, 'string'));
}

isString.negativeForm = 'isNotString';

export default isString;