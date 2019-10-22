function TestObject(testFn, parent, fieldName, statement, severity) {
    this.testFn = testFn;
    this.fieldName = fieldName;
    this.statement = statement;
    this.severity = severity;
    this.parent = parent;
};

TestObject.prototype.valueOf = function() {
    return this.isValid !== false;
};

TestObject.prototype.fail = function() {

    this.parent.result.fail(
        this.fieldName,
        this.statement,
        this.severity
    );

    this.isValid = false;
    return this;
};

TestObject.prototype.setPending = function() {
    this.parent.pending.push(this);
};

export default TestObject;
