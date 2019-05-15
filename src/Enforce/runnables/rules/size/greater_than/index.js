// @flow
import isNumeric from '../../content/is_numeric';

function greaterThan(value: NumericValue, arg1: NumericValue): boolean {
    return isNumeric(value) && isNumeric(arg1) && Number(value) > Number(arg1);
}

greaterThan.alias = 'gt';

export default greaterThan;