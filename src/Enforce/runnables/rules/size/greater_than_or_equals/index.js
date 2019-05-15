// @flow
import isNumeric from '../../content/is_numeric';

function greaterThanOrEquals(value: NumericValue, arg1: NumericValue): boolean {
    return isNumeric(value) && isNumeric(arg1) && Number(value) >= Number(arg1);
}

greaterThanOrEquals.alias = 'gte';

export default greaterThanOrEquals;