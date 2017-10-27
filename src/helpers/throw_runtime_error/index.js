// @flow
const passableArgs:string = 'passableArgs';

function errorBuilder(functionName, errorMessage) {
    return `[Passable]: Failed to execute '${functionName}': ${errorMessage}`;
}

function throwRuntimeError(type: string, ...args: Array<string>) {
    switch (type) {
        case '0':
            throw new TypeError(errorBuilder('Passable constructor', `Unexpected ${args[0]}, expected string.`));
        case '1':
            throw new Error(errorBuilder('Enforce', `${args[0]} - invalid ${args[1]} value.`));
        case '2':
            const val:string = Array.isArray(args[1]) ? JSON.stringify(args[1]) : args[1];
            throw new TypeError(errorBuilder(args[0], `expected ${val} to be a ${args[2]}.`));
        case '3':
            throw new TypeError(errorBuilder(passableArgs, 'At least 1 argument required, but only 0 present.'));
        case '4':
            throw new TypeError(errorBuilder(passableArgs, `Unexpected ${args[0]}, expected function.`));
        case '5':
            throw new TypeError(errorBuilder(passableArgs, "Unexpected argument, expected function at position '1' or '2'."));
        case '6':
            throw new TypeError(errorBuilder(passableArgs, "Unexpected argument, expected function at position '2'."));
        case '7':
            throw new TypeError(errorBuilder(passableArgs, 'Unexpected set of arguments. Expected: Specific, Passes, Custom.'));
        default:
            throw new Error(errorBuilder('Passable', 'General exception.'));
    }
}

export default throwRuntimeError;