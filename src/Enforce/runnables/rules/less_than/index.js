// @flow
import isNumeric from '../is_numeric';

function lessThan(value: NumericValue, arg1: NumericValue): boolean {
    return isNumeric(value) && isNumeric(arg1) && Number(value) < Number(arg1);
}

lessThan.alias = 'lt';

export default lessThan;