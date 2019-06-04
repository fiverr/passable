// @flow
import isNumeric from '../../content/is_numeric';

function numberEquals(value: NumericValue, arg1: NumericValue): boolean {
    return isNumeric(value) && isNumeric(arg1) && Number(value) === Number(arg1);
}

numberEquals.negativeForm = 'numberNotEquals';

export default numberEquals;