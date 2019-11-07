import singleton from '../../lib/singleton';

/**
 * Creates a new context object, and assigns it as a static property on the constructor function for outside reference.
 * @param {Object} parent   Parent context.
 */
const Context = function(parent) {
    singleton.use().Context.ctx = this;
    Object.assign(this, parent);
};

/**
 * Clears stored instance from constructor function.
 */
Context.clear = function() {
    singleton.use().Context.ctx = null;
};

export default Context;
