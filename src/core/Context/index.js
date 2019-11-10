import { singleton } from '../../lib';

/**
 * Creates a new context object, and assigns it as a static property on Passable's singleton.
 * @param {Object} parent   Parent context.
 */
const Context = function(parent) {
    singleton.use().ctx = this;
    Object.assign(this, parent);
};

/**
 * Clears stored instance from constructor function.
 */
Context.clear = function() {
    singleton.use().ctx = null;
};

export default Context;
