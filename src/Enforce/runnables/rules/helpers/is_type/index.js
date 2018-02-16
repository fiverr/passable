// @flow

/**
 * Check if value type matches any of provided types
 * Allows checking agains custom type 'array' for array values
 *
 * @example
 * // returns false
 * isType(5, 'string')
 * @example
 * // returns true
 * isType([], 'string', 'array')
 * @param {any} value Value to match
 * @param {...string} types
 * @return {boolean} true if value matches against any type, false otherwise
 */
function isType(value: mixed, ...types: Array<string>): boolean {
    return types.some((type) => type === 'array' ? Array.isArray(value) : (typeof value === type));
}

export default isType;