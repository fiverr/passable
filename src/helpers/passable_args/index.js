// @flow

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

    let passes: Passes,
        specific: Specific = [],
        custom: Rules = {};

    let res: [Array<string> | string, Passes, Rules];

    switch (args.length) {
        case 0:
            throw new TypeError("[Passable]: Failed to execute 'passableArgs': At least 1 argument required, but only 0 present.");

        case 1: // [passes] = args;
            if (typeof args[0] !== 'function') {
                throw new TypeError(`[Passable]: Failed to execute 'passableArgs': Unexpected ${typeof args[0]}, expected function`);
            } else {
                res = [specific, args[0], custom];
            }
            break;
        case 2:
            if (typeof args[1] === 'function' && (typeof args[0] === 'string' || Array.isArray(args[0]))) {
                // [specific, passes]
                res = [args[0], args[1], custom];
            } else if (typeof args[0] === 'function') {
                // [passes, custom]
                res = typeof args[1] === 'object' && !Array.isArray(args[1]) ? [specific, args[0], args[1]] : [specific, args[0], custom];
            } else {
                throw new TypeError("[Passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at positon '1' or '2'");
            }
            break;
        case 3: // [specific, passes, custom]
        default:
            if (typeof args[1] !== 'function') {
                // [specific, ?, custom]
                throw new TypeError("[Passable]: Failed to execute 'passableArgs': Unexpected argument, expected function at positon '2'");
            } else if (!(typeof args[0] === 'string' || Array.isArray(args[0])) || !(typeof args[2] === 'object' && !Array.isArray(args[2]))) {
                // [?, passes, ?]
                throw new TypeError("[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Passes, Custom");
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