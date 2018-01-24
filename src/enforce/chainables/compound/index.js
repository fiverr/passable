// @flow
import runners from '../../runners';
import { Errors } from 'Constants';
import { runtimeError } from 'Helpers';

/**
 * Run group of tests using test runner. (e.g. `anyOf`)
 *
 * @private
 * @param {string} group - name of test runner
 * @param {object} tests
 * @return {object} enforce object
 */
function compound(value: AnyValue, group: string, tests: Tests, allRules: Rules = {}): EnforceSelf {
    if (this.valid === false) {
        return this;
    }

    this.valid = runners[group](value, tests, allRules);

    if (this.valid !== true) {
        throw runtimeError(Errors.ENFORCE_FAILED, group, typeof value);
    }

    return this;
}

export default compound;