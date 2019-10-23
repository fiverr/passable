import ctx from '../context';
import { isTestFn, TestObject } from './lib';

/**
 * Run async test.
 * @param {TestObject} testObject A TestObject instance.
 */
export const runAsync = (testObject) => {
    const { fieldName, testFn, statement, parent } = testObject;

    parent.result.markAsync(fieldName);

    const done = () => {
        testObject.clearPending();

        if (!hasRemainingPendingTests(parent, fieldName)) {
            parent.result.markAsDone(fieldName);
        }

        if (!hasRemainingPendingTests(parent)) {
            parent.result.markAsDone();
        }
    };

    const fail = (rejectionMessage) => {
        testObject.statement = typeof rejectionMessage === 'string'
            ? rejectionMessage
            : statement;

        if (parent.pending.includes(testObject)) {
            testObject.fail();
        }

        done();
    };

    try {
        testFn.then(done, fail);
    } catch (e) {
        fail();
    }
};

/**
 * Checks if there still are remaining pending tests for given criteria
 * @param {Object} parent       Parent context
 * @param {String} [fieldName]  Name of the field to test against
 * @return {Boolean}
 */
const hasRemainingPendingTests = (parent, fieldName) => {
    if (!parent.pending.length) {
        return false;
    }

    if (fieldName) {
        return parent.pending.some((testObject) => testObject.fieldName === fieldName);
    }

    return !!parent.pending.length;
};

/**
 * Performs "shallow" run over test functions, assuming sync tests only.
 * @param {TestObject} testObject TestObject instance.
 * @return {*} Result from test function
 */
const preRun = (testObject) => {
    let result;
    try {
        result = testObject.testFn();
    } catch (e) {
        result = false;
    }

    if (result === false) {
        testObject.fail();
    }

    return result;
};

/**
 * Registers test, if async - adds to pending array
 * @param {TestObject} testObject   A TestObject Instance.
 */
const register = (testObject) => {
    const { testFn, parent, fieldName } = testObject;
    let pending = false;
    let result;

    if (parent.specific.excludes(fieldName)) {
        parent.result.addToSkipped(fieldName);
        return;
    }

    parent.result.initFieldCounters(fieldName);
    parent.result.bumpTestCounter(fieldName);

    if (testFn && typeof testFn.then === 'function') {
        pending = true;
    } else {
        result = preRun(testObject);
    }

    if (result && typeof result.then === 'function') {
        pending = true;

        testObject.testFn = result;
    }

    if (pending) {
        testObject.setPending();
    }
};

/**
 * Test function used by consumer to provide their own validations.
 * @param {String} fieldName            Name of the field to test.
 * @param {String} [statement]          The message returned in case of a failure.
 * @param {function | Promise} testFn   The actual test callback or promise.
 * @param {String} [severity]           Indicates whether the test should fail or warn.
 * @return {TestObject}                 A TestObject instance.
 */
const test = (fieldName, ...args) => {
    let statement,
        testFn,
        severity;

    if (typeof args[0] === 'string') {
        [statement, testFn, severity] = args;
    } else if (isTestFn(args[0])) {
        [testFn, severity] = args;
    }

    if (!isTestFn(testFn)) {
        return;
    }

    const testObject = new TestObject(
        ctx.parent,
        fieldName,
        statement,
        testFn,
        severity
    );

    register(testObject);

    return testObject;
};

export default test;
