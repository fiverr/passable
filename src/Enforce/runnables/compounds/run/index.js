// @flow
/**
 * A function which returns whether a combination of
 * rule + value is true or false
 *
 * @param {any} value - the value being tested
 * @param {string} key the name of the rule being run
 * @param {Object} tests an object containing the group of tests in the current run
 * @param {Object} rules an object containing all the rules available for the current test
 * @return {boolean} value validation result
 */

export default function run(value: AnyValue, key: string, tests: CompoundTestObject, rules: EnforceRules): boolean {

    if (typeof rules[key] !== 'function') {
        if (typeof tests[key] === 'function') {
            return tests[key](value);
        }

        return false;
    }

    const args: mixed = tests[key];

    return rules[key](value, args);
}