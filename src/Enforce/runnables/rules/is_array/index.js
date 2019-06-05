// @flow

function isArray(value: mixed): boolean {
    return Boolean(Array.isArray(value));
}

isArray.negativeForm = 'isNotArray';

export default isArray;