// @flow
import isType from '../is_type';

/**
 * Check if value type does not match any provided types
 * Inverse of isType
 * @see {@link isType}
 * @see isType
 */
export function isNotType(value: mixed, ...types: Array<string>): boolean {
    return !isType(value, ...types);
}

export default isNotType;