// @flow

import { Errors } from 'Constants';
import { runtimeError } from 'Helpers';

/**
 * Run a single rule against enforced value (e.g. `isNumber()`)
 *
 * @param {string} rule - name of rule to run
 * @param {array} spread list of arguments sent from consumer
 * @return {object} enforce object
 */
function single(value: AnyValue, rule: Function, ...args: Array<mixed>): EnforceProxy {
    const isValid: boolean = rule(value, ...args);

    if (isValid !== true) {
        throw runtimeError(Errors.ENFORCE_FAILED, rule.name, typeof value);
    }

    return this;
}

export default single;
