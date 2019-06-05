// @flow

function equals(value: AnyValue, arg1: AnyValue): boolean {
    return value === arg1;
}

equals.negativeForm = 'notEquals';

export default equals;