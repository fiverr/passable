// @flow
import isType from '../../../helpers/is_type';

function isArray(value: mixed): boolean {
    return Boolean(isType(value, 'array'));
}

isArray.negativeForm = 'isNotArray';

export default isArray;