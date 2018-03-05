// @flow

import { Errors } from 'Constants';
import { runtimeError } from 'Helpers';

/**
 * Run a single rule against enforced value (e.g. `isNumber()`)
 *
 * @param {Function} rule - rule to run
 * @param {Any} value
 * @param {Array} args list of arguments sent from consumer
 */
function rule(rule: EnforceRule, value: AnyValue, ...args: RuleArgs): void {

    if (typeof rule !== 'function') { return; }

    if (rule(value, ...args) !== true) {
        throw runtimeError(Errors.ENFORCE_FAILED, rule.name, typeof value);
    }
}

export default rule;
