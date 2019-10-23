/**
 * Describes a test call inside a passable suite.
 * @param {Object} parent               Parent Context.
 * @param {String} fieldName            Name of the field being tested.
 * @param {String} statement            The message returned when failing.
 * @param {Promise|Function} testFn     The actual test callbrack or promise.
 * @param {String} [severity]           Indicates whether the test should fail or warn.
 */
function TestObject(parent, fieldName, statement, testFn, severity) {
    Object.assign(this, {
        parent,
        testFn,
        fieldName,
        statement,
        severity
    });
};

/**
 * @returns Current validity status of a test.
 */
TestObject.prototype.valueOf = function() {
    return this.isValid !== false;
};

/**
 * Sets a field to failed.
 * @returns {TestObject} Current instance.
 */
TestObject.prototype.fail = function() {

    this.parent.result.fail(
        this.fieldName,
        this.statement,
        this.severity
    );

    this.isValid = false;
    return this;
};

/**
 * Adds current test to pending list.
 */
TestObject.prototype.setPending = function() {
    this.parent.pending.push(this);
};

/**
 * Removes test from pending list.
 */
TestObject.prototype.clearPending = function() {
    this.parent.pending = this.parent.pending.filter((t) => t !== this);
};

export default TestObject;
