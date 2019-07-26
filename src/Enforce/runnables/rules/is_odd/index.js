import isNumeric from '../is_numeric';

/**
 * Validates that a given value is an odd number
 * @param {Number|String} value Value to be validated
 * @return {Boolean}
 */
const isOdd = (value) => {

    if (!isNumeric(value)) {
        return false;
    }

    if (typeof value === 'string') {
        value = Number(value);
    }

    return Math.abs(value % 2) === 1;
};

export default isOdd;
