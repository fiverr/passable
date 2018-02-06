// @flow
import { runtimeError, isSpecific, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * tests - The function which runs the validations
 *
 * @param {Array | String | Object} specific
 * @param {tests} Function
 * @return {object} Passable configuration settings
 */
function passableArgs(specific: Specific, tests: CompoundTestObject): PassableRuntime {

    if (!arguments.length) {
        throw runtimeError(Errors.PASSABLE_ARGS_NO_ARGS);
    }

    if (typeof tests !== 'function') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1, typeof tests);
    }

    if (!isSpecific(specific)) {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2);
    }

    return {
        specific: buildSpecificObject(specific),
        tests
    };
};

export default passableArgs;
