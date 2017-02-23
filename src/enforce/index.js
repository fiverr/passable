/**
 * @module enforce
 */

import rules from './rules';

/**
 * Registers custom rules and exposes an api
 *
 * @param  {Object} custom - An Object containing custom rules
 * @return {Function} the 'enforce' function, which is accessed in the validation proccess
 *
 * @example Enforce({
 *  is_larger_than: (a, b) => a > b;
 * });
 */
const Enforce = (custom) => {

    const registered = {};

    /** Registers rules and makes them available */
    const register = () => {
        custom = custom || {};
        Object.assign(registered, rules(), custom);
    };

    /** Provides an API for running tests (using registered rules) */
    const enforce = (value, tests) => {

        let isValid = true;
        for (const rule in tests) {

            let expect = true;

            const options = tests[rule],
                result = run(value, rule, options);

            if (options && options.hasOwnProperty('expect')) {
                expect = options.expect;
            }

            if (expect !== result) {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    /** Called by 'enforce' to run tests */
    const run = (value, rule, options) => {

        if (typeof registered[rule] === "function") {
            return registered[rule](value, options);
        }
    };

    register();

    return enforce;
};

export default Enforce;