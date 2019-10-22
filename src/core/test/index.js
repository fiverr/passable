import ctx from '../context';
import TestObject from './TestObject';

/**
 * Runs all async tests, updates output object with result
 * @param {Promise} testPromise the actual test callback or promise
 */
export const runAsync = (testObject) => {
    const { fieldName, testFn, statement, parent } = testObject;

    parent.result.markAsync(fieldName);

    const done = () => {
        clearPendingTest(testObject);

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
 * Clears pending test from parent context
 * @param {Promise} testPromise the actual test callback or promise
 */
const clearPendingTest = (testObject) => {
    testObject.parent.pending = testObject.parent.pending.filter((t) => t !== testObject);
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
 * Performs shallow run over test functions, assuming sync tests only. Returning result
 * @param {function | Promise} testFn the actual test callback or promise
 * @return {*} result from test function
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
 * Registers all supplied tests, if async - adds to pending array
 * @param {function | Promise} testFn the actual test callback or promise
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
 * Checks that a given argument qualifies as a test function
 * @param {*} testFn
 * @return {Boolean}
 */
const isTestFn = (testFn) => {
    if (!testFn) {
        return false;
    }

    return typeof testFn.then === 'function' || typeof testFn === 'function';
};

/**
 * The function used by the consumer
 * @param {String} fieldName name of the field to test against
 * @param {String} [statement] the message shown to the user in case of a failure
 * @param {function | Promise} testFn the actual test callback or promise
 * @param {String} [severity] indicates whether the test should fail or warn
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
        testFn,
        ctx.parent,
        fieldName,
        statement,
        severity
    );

    register(testObject);

    return testObject;
};

export default test;
