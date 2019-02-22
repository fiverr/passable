// @flow

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
        throw new Error(`[Enforce]: ${runner.name}  invalid ${typeof value} value`);
    }
}

export default compound;