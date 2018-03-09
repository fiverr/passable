// @flow

/**
 * Collects rules with `negativeForm` attributes.
 * When found, it creates a new function that flips
 * the value of the original rule.
 * @param {Object} rules - enforce rules object
 * @returns {Object} extended rules object
 */
function extendNegativeRules(rules: EnforceRules) {

    for (const rule: string in rules) {
        const negativeForm: string = rules[rule].negativeForm;

        if (negativeForm) {
            rules[negativeForm] = (...args) => !rules[rule](...args);
        }
    }

    return rules;
}

export default extendNegativeRules;
