// @flow
import isNumeric from '../is_numeric';

function lessThanOrEquals(value: NumericValue, arg1: NumericValue): boolean {
    return isNumeric(value) && isNumeric(arg1) && Number(value) <= Number(arg1);
}

lessThanOrEquals.alias = 'lte';

export default lessThanOrEquals;