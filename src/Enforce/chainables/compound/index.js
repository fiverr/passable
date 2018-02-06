// @flow
import runners from '../../runners';
import { Errors } from 'Constants';
import { runtimeError } from 'Helpers';

/**
 * Run group of tests using test runner. (e.g. `anyOf`)
 *
 * @param {string} group - name of test runner
 * @param {object} tests
 * @return {object} enforce object
 */
function compound(value: AnyValue, group: string, tests: CompoundTestObject, allRules: EnforceRules = {}): EnforceProxy {
    const isValid: boolean = runners[group](value, tests, allRules);

    if (isValid !== true) {
        throw runtimeError(Errors.ENFORCE_FAILED, group, typeof value);
    }

    return this;
}

export default compound;