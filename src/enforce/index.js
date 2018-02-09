// @flow
import rules from './rules';
import runners from './runners';
import { compound, single } from './chainables';

/**
 * Run tests on value using existing test runners and rules
 *
 * @throws Will throw an error on failed test
 * @param {any} value Value to test
 * @param {object} custom Custom test rules
 * @return {object} enforce object
 */
function enforce(value: mixed, custom: Rules = {}): EnforceSelf {
    const allRules: Rules = Object.assign({}, rules, custom),
        self: EnforceSelf = {
            fin: function fin() { return !!self.valid; }
        };

    // use enforce object as proxy to test runners
    Object.keys(runners).forEach((group: string) => {
        self[group] = (tests: CompoundTestObject) => compound.bind(self)(value, group, tests, allRules);
    });

    // use enforce object as proxy to rules
    Object.keys(allRules).forEach((rule: string) => {
        self[rule] = (...args) => single.bind(self)(value, allRules[rule], ...args);
    });

    return self;
}

export default enforce;