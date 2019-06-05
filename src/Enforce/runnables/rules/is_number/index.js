// @flow

function isNumber(value: mixed): boolean {
    return Boolean(typeof value === 'number');
}

isNumber.negativeForm = 'isNotNumber';

export default isNumber;