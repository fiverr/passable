// @flow
import rules from './rules';
import runners from './runners';
import { runtimeError } from 'Helpers';
import { Errors } from 'Constants';

/**
 * Run tests on value using existing test runners and rules
 *
 * @throws Will throw an error on failed test
 * @param {any} value Value to test
 * @param {object} custom Custom test rules
 * @return {object} enforce object
 */
function enforce(value: mixed, custom: Rules = {}) {
    const allRules: Rules = Object.assign({}, rules, custom),
        self: EnforceSelf = {
            fin: function fin() { return !!self.valid; }
        };

    // use enforce object as proxy to test runners
    for (const group: string of Object.keys(runners)) {
        /** @method */
        self[group] = (tests: Tests) => run(group, tests);
    }

    /**
     * Run group of tests using test runner. (e.g. `anyOf`)
     *
     * @private
     * @param {string} group - name of test runner
     * @param {object} tests
     * @return {object} enforce object
     */
    function run(group: string, tests: Tests) {
        if (self.valid === false) {
            return self;
        }

        self.valid = runners[group](value, tests, allRules);

        if (self.valid !== true) {
            throw runtimeError(Errors.INVALID_FORM_NAME, group, typeof value);
        }

        return self;
    }

    return self;
}

export default enforce;