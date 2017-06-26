import isType from '../is_type';

function throwTypeError(value, type, functionName) {
    throw new TypeError(`${functionName}: expected ${value} to be a ${type}.`);
}

function expect_type(value, type, functionName) {
    if (!isType(value, type, true)) {
        return throwTypeError(value, type, functionName);
    }

    return true;
}

export default expect_type;