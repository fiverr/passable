// @flow

function lengthEquals(value: StringOrArray, arg1: number): boolean {
    return value.length === arg1;
}

lengthEquals.negativeForm = 'lengthNotEquals';

export default lengthEquals;
