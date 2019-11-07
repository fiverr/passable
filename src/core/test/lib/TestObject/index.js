/**
 * Describes a test call inside a passable suite.
 * @param {Object} ctx                  Parent context.
 * @param {String} fieldName            Name of the field being tested.
 * @param {String} statement            The message returned when failing.
 * @param {Promise|Function} testFn     The actual test callbrack or promise.
 * @param {String} [severity]           Indicates whether the test should fail or warn.
 */
function TestObject(ctx, fieldName, statement, testFn, severity) {
    Object.assign(this, {
        ctx,
        testFn,
        fieldName,
        statement,
        severity,
        failed: false
    });
};

/**
 * @returns Current validity status of a test.
 */
TestObject.prototype.valueOf = function() {
    return this.failed !== true;
};

/**
 * Sets a field to failed.
 * @returns {TestObject} Current instance.
 */
TestObject.prototype.fail = function() {

    this.ctx.result.fail(
        this.fieldName,
        this.statement,
        this.severity
    );

    this.failed = true;
    return this;
};

/**
 * Adds current test to pending list.
 */
TestObject.prototype.setPending = function() {
    this.ctx.pending.push(this);
};

/**
 * Removes test from pending list.
 */
TestObject.prototype.clearPending = function() {
    this.ctx.pending = this.ctx.pending.filter((t) => t !== this);
};

export default TestObject;
