// @flow

function longerThanOrEquals(value: StringOrArray, arg1: number): boolean {
    return value.length && value.length >= arg1;
}

export default longerThanOrEquals;
