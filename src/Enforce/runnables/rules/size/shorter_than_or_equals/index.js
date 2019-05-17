// @flow

function shorterThanOrEquals(value: StringOrArray, arg1: number): boolean {
    return value.length && value.length <= arg1;
}

export default shorterThanOrEquals;
