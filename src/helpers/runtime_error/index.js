// @flow
import { Errors } from 'Constants';
const passableArgs: string = 'passableArgs';

const passableArgsExpected: string = 'Expected: Specific, Tests, Custom';

function errorBuilder(functionName, errorMessage) {
    return `[Passable]: Failed to execute '${functionName}': ${errorMessage}`;
}

function runtimeError(type: string, ...args: Array<string>) {
    switch (type) {
        case Errors.INVALID_FORM_NAME:
            return new TypeError(errorBuilder('Passable constructor', `Unexpected '${args[0]}', expected string.`));
        case Errors.ENFORCE_FAILED:
            return new Error(errorBuilder('Enforce', `${args[0]} - invalid ${args[1]} value.`));
        case Errors.EXPECT_TYPE_FAILURE:
            const val:string = Array.isArray(args[1]) ? JSON.stringify(args[1]) : args[1];
            return new TypeError(errorBuilder(args[0], `expected ${val} to be a ${args[2]}.`));
        case Errors.PASSABLE_ARGS_NO_ARGS:
            return new TypeError(errorBuilder(passableArgs, `Missing arguments. ${passableArgsExpected}.`));
        case Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1:
            return new TypeError(errorBuilder(passableArgs, `Unexpected '${args[0]}', expected tests to be a function.`));
        case Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2:
            return new TypeError(errorBuilder(passableArgs, `Unexpected set of arguments. ${passableArgsExpected}.`));
        default:
            return new Error(errorBuilder('Passable', 'General exception.'));
    }
}

export default runtimeError;