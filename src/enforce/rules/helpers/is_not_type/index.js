// @flow
import isType from '../is_type';

/**
 * Check if value type does not match any provided types
 * Inverse of isType
 * @see {@link isType}
 * @see isType
 */
export function isNotType(...args) {
    return !isType(...args);
}

export default isNotType;