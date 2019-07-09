const Context = function() {}; // eslint-disable-line

Context.prototype.set = function(parent) {
    this.parent = parent;
    return this;
};

const context = new Context();

export default context;
