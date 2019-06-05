// @flow

function isString(value: mixed): boolean {
    return Boolean(typeof value === 'string');
}

isString.negativeForm = 'isNotString';

export default isString;