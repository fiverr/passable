/**
 * @type {String} Passable's major version.
 */
const PASSABLE_MAJOR = PASSABLE_VERSION.split('.')[0];

/**
 * @type {Symbol} Used to store a global instance of Passable.
 */
export const SYMBOL_PASSABLE = Symbol.for(`PASSABLE#${PASSABLE_MAJOR}`);
