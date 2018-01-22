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
        self[group] = (tests: Tests) => multi(group, tests);
    }

    /**
     * Run group of tests using test runner. (e.g. `anyOf`)
     *
     * @private
     * @param {string} group - name of test runner
     * @param {object} tests
     * @return {object} enforce object
     */
    function multi(group: string, tests: Tests) {
        if (self.valid === false) {
            return self;
        }

        self.valid = runners[group](value, tests, allRules);

        if (self.valid !== true) {
            throw runtimeError(Errors.ENFORCE_FAILED, group, typeof value);
        }

        return self;
    }

    // use enforce object as proxy to rules
    for (const rule: string of Object.keys(allRules)) {
        /** @method */
        self[rule] = (...args) => single(rule, ...args);
    }

    /**
     * Run a single rule against enforce value (e.g. `isNumber()`)
     *
     * @private
     * @param {string} rule - name of rule to run
     * @param {array} spread list of arguments sent from consumer
     * @return {object} enforce object
     */
    function single(rule: string, ...args: Array<mixed>) {
        if (self.valid === false) {
            return self;
        }

        self.valid = allRules[rule](value, ...args);

        if (self.valid !== true) {
            throw runtimeError(Errors.ENFORCE_FAILED, rule, typeof value);
        }

        return self;
    }

    return self;
}

export default enforce;