// @flow

function isTruthy(value: mixed): boolean {
    return !!value;
}

isTruthy.negativeForm = 'isFalsy';

export default isTruthy;