import isNumeric from '../is_numeric';

/**
 * Validates that a given value is an even number
 * @param {Number|String} value Value to be validated
 * @return {Boolean}
 */
const isEven = (value) => {

    if (!isNumeric(value)) {
        return false;
    }

    if (typeof value === 'string') {
        value = Number(value);
    }

    return Math.abs(value % 2) === 0;
};

export default isEven;
