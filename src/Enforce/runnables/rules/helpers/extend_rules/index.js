// @flow

/**
 * Collects rules with `negativeForm` or `alias` attributes.
 * Adds a rule with the correct configuration.
 * @param {Object} rules - enforce rules object
 * @returns {Object} extended rules object
 */
function extendRules(rules: EnforceRules) {

    for (const rule: string in rules) {
        const negativeForm: string = rules[rule].negativeForm;
        const alias: string = rules[rule].alias;

        if (negativeForm) {
            rules[negativeForm] = (...args) => !rules[rule](...args);
        }

        if (alias) {
            rules[alias] = rules[rule];
        }
    }

    return rules;
}

export default extendRules;
