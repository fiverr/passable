// @flow
import { runtimeError, isSpecific, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * tests - The function which runs the validations
 * custom - custom validation rules
 *
 * @param {Array | String | Object} specific
 * @param {tests} Function
 * @param {custom} Object
 * @return {object} Passable configuration settings
 */
function passableArgs(specific: Specific, tests: CompoundTestObject, custom?: Rules = {}): PassableRuntime {

    if (!arguments.length) {
        throw runtimeError(Errors.PASSABLE_ARGS_NO_ARGS);
    }

    if (typeof tests !== 'function') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1, typeof tests);
    }

    if (!isSpecific(specific) || typeof custom !== 'object') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2);
    }

    return {
        specific: buildSpecificObject(specific),
        tests,
        custom
    };
};

export default passableArgs;
