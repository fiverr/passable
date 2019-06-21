// @flow

/**
 * Run tests and catch errors
 *
 * @param {function} callback The test content
 * @return {boolean}
 */
function validate(test: PassableTest): boolean {

    if (typeof test !== 'function' && !(test instanceof Promise)) {
        throw new TypeError(`[Validate]: expected ${typeof test} to be a function.`);
    }

    try {
        return test() !== false;
    } catch (_) {
        return false;
    }
}

export default validate;