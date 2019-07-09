import isNumeric from '../is_numeric';

function lessThanOrEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) <= Number(arg1);
}

lessThanOrEquals.alias = 'lte';

export default lessThanOrEquals;
