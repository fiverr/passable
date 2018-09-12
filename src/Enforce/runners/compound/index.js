// @flow
import { Errors } from '../../../constants';
import { runtimeError } from '../../../helpers';

/**
 * Run group of tests using test runner. (e.g. `anyOf`)
 *
 * @param {Object} allRules
 * @param {Function} runner - test runner
 * @param {Any} value
 * @param {Object} tests
 * @return {object} enforce object
 */
function compound(allRules: EnforceRules, runner: Runner, value: AnyValue, tests: CompoundTestObject): void {
    if (typeof runner !== 'function') { return; }

    if (runner(value, tests, allRules) !== true) {
        throw runtimeError(Errors.ENFORCE_FAILED, runner.name, typeof value);
    }
}

export default compound;