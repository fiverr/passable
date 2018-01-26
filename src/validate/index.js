// @flow

/**
 * @typedef {Object} ValidityObject
 * @property {boolean} valid Representing the validity of the object
 * @property {string} [message] The message passed by the consumer. Used to indicate error.
 */

/**
 * Run tests and catch errors
 *
 * @param {string} [message] Message to return on failed validation
 * @param {function} callback The test content
 * @return {ValidityObject} enforce object
 */
function validate(...args: [string, Function]): ValidityObject {
    const result: ValidityObject = { valid: true };
    const length: number = args.length;

    if (!length) { return result; }

    const last: number = length - 1;
    let callback: Function;
    let message: ?string;

    if (typeof args[last] !== 'function') {
        return result;
    } else {
        callback = args[last];
    }

    if (typeof args[0] === 'string') {
        message = args[0];
    }

    try {
        result.valid = callback() !== false;
    } catch (_) {
        result.valid = false;
    }

    if (!result.valid && message) {
        result.message = message;
    }

    return result;
}

export default validate;