// @flow
import { Errors } from 'Constants';
const passableConstructor: string = 'Passable constructor';

function errorBuilder(functionName, errorMessage) {
    return `[Passable]: Failed to execute '${functionName}': ${errorMessage}`;
}

function unexpectedArgs(type, name, position) {
    return `Unexpected '${type}'. Expected \`${name}\` at position ${position}.`;
}

function runtimeError(type: string, ...args: Array<string>) {
    switch (type) {
        case Errors.INVALID_FORM_NAME:
            return new TypeError(errorBuilder(passableConstructor, `Unexpected '${args[0]}', expected string.`));
        case Errors.ENFORCE_FAILED:
            return new Error(errorBuilder('Enforce', `${args[0]} - invalid ${args[1]} value.`));
        case Errors.EXPECT_TYPE_FAILURE:
            const val:string = Array.isArray(args[1]) ? JSON.stringify(args[1]) : args[1];
            return new TypeError(errorBuilder(args[0], `expected ${val} to be a ${args[2]}.`));
        case Errors.MISSING_ARGUMENT_TESTS:
            return new TypeError(errorBuilder(passableConstructor, unexpectedArgs(args[0], 'tests', 2)));
        case Errors.MISSING_ARGUMENT_SPECIFIC:
            return new TypeError(errorBuilder(passableConstructor, unexpectedArgs(args[0], 'specific', 1)));
        default:
            return new Error(errorBuilder('Passable', 'General exception.'));
    }
}

export default runtimeError;