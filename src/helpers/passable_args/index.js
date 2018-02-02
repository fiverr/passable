// @flow
import { runtimeError, isSpecific } from 'Helpers';
import { Errors } from 'Constants';

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * passes - The function which runs the validations
 * custom - custom validation rules
 *
 * @param {Array | String | Object} specific
 * @param {passes} Function
 * @param {custom} Object
 * @return {object} Passable configuration settings
 */
function passableArgs(specific: Specific, passes: Passes, custom?: Rules = {}): PassableRuntime {

    if (arguments.length === 0) {
        throw runtimeError(Errors.PASSABLE_ARGS_NO_ARGS);
    }

    if (typeof passes !== 'function') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1, typeof passes);
    }

    if (!isSpecific(specific) || typeof custom !== 'object') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2);
    }

    return {
        specific: specific || [],
        passes,
        custom
    };
};

export default passableArgs;
