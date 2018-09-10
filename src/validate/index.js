// @flow
import runtimeError from '../helpers/runtime_error';
import { Errors } from '../constants';

/**
 * Run tests and catch errors
 *
 * @param {function} callback The test content
 * @return {boolean}
 */
function validate(test: PassableTest): boolean {

    if (typeof test !== 'function' && !(test instanceof Promise)) {
        throw runtimeError(Errors.VALIDATE_UNEXPECTED_TEST, typeof test);
    }

    try {
        return test() !== false;
    } catch (_) {
        return false;
    }
}

export default validate;