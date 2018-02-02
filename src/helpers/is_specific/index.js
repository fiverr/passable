// @flow

/**
 * Test whether a given argument matches
 * the `specific` filter convention
 *
 * @param {Any} specific
 * @return {boolean}
 */
export default function isSpecific(specific: mixed): boolean {
    return (
        Array.isArray(specific)
        || specific === null
        || typeof specific === 'object'
    );
}