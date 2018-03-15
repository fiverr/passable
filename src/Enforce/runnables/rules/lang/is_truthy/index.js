// @flow
function isTruthy(value: mixed, expect: boolean = true): boolean {
    return !!value;
}

isTruthy.negativeForm = 'isFslsy';

export default isTruthy;