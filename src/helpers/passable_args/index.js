// @flow
import { runtimeError } from 'Helpers';
import { Errors } from 'Constants';

/**
 * The function which runs the validation tests.
 *
 * @callback passableCallback
 * @param {function} pass
 * @param {function} enforce
 */

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * passes - The function which runs the validations
 * custom - custom validation rules
 *
 * @param {Array.<{specific: String[], passes: passableCallback, custom: Object}>} args - arguments for Passable configuration
 * @return {object} Passable configuration settings
 */
function passableArgs(args: PassableArguments): PassableRuntime {

    let specific: Specific = [],
        passes: Passes,
        custom: Rules = {};

    let res: [Specific, Passes, Rules];

    switch (args.length) {
        case 0:
            throw runtimeError(Errors.PASSABLE_ARGS_NO_ARGS);

        case 1: // [passes] = args;
            if (typeof args[0] !== 'function') {
                throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1, typeof args[0]);
            } else {
                res = [specific, args[0], custom];
            }
            break;
        case 2:
            if (typeof args[1] === 'function' && (args[0] === undefined || typeof args[0] === 'string' || Array.isArray(args[0]))) {
                // [specific, passes]
                res = [args[0], args[1], custom];
            } else if (typeof args[0] === 'function') {
                // [passes, custom]
                res = typeof args[1] === 'object' && !Array.isArray(args[1]) ? [specific, args[0], args[1]] : [specific, args[0], custom];
            } else {
                throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2);
            }
            break;
        case 3: // [specific, passes, custom]
        default:
            if (typeof args[1] !== 'function') {
                // [specific, ?, custom]
                throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_3);
            } else if (!(args[0] === undefined || typeof args[0] === 'string' || Array.isArray(args[0])) || !(typeof args[2] === 'object' && !Array.isArray(args[2]))) {
                // [?, passes, ?]
                throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_4);
            } else {
                res = [args[0], args[1], args[2]];
            }
            break;
    }

    [specific, passes, custom] = res;

    return {
        specific, passes, custom
    };
};

export default passableArgs;
