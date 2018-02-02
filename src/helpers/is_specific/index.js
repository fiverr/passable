// @flow

/**
 * Test whether a given argument matches
 * the `specific` filter convention
 *
 * @param {Any} specific
 * @return {boolean}
 */
export default function isSpecific(specific: mixed): boolean {
    if (Array.isArray(specific)) {
        return specific.every((item) => typeof item === 'string');
    }

    return (
        specific === null
        || typeof specific === 'object'
        || typeof specific === 'string'
    );
}