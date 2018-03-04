// @flow
import { Errors, Modules } from 'Constants';
const passableConstructor: string = `${Modules.PASSABLE} constructor`;

function errorBuilder(functionName, errorMessage) {
    return `[${Modules.PASSABLE}]: Failed to execute '${functionName}': ${errorMessage}`;
}

function unexpectedArgs(type, name, position) {
    return `Unexpected '${type}'. Expected \`${name}\` at position ${position}. See documentation for more info.`;
}

function runtimeError(type: string, ...args: Array<string>) {
    switch (type) {
        case Errors.INVALID_FORM_NAME:
            return new TypeError(errorBuilder(passableConstructor, `Unexpected '${args[0]}', expected string.`));
        case Errors.ENFORCE_FAILED:
            return new Error(errorBuilder(Modules.ENFORCE, `${args[0]} - invalid ${args[1]} value.`));
        case Errors.EXPECT_TYPE_FAILURE:
            const val:string = Array.isArray(args[1]) ? JSON.stringify(args[1]) : args[1];
            return new TypeError(errorBuilder(args[0], `expected ${val} to be a ${args[2]}.`));
        case Errors.MISSING_ARGUMENT_TESTS:
            return new TypeError(errorBuilder(passableConstructor, unexpectedArgs(args[0], 'tests', 1)));
        case Errors.UNEXPECTED_ARGUMENT_SPECIFIC:
            return new TypeError(errorBuilder(passableConstructor, unexpectedArgs(args[0], 'specific', 2)));
        case Errors.VALIDATE_UNEXPECTED_TEST:
            return new TypeError(errorBuilder(Modules.VALIDATE, `Expected ${args[0]} \`test\` to be a function.`));
        default:
            return new Error(errorBuilder(Modules.PASSABLE, 'General exception.'));
    }
}

export default runtimeError;