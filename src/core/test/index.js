import ctx from '../context';

/**
 * Runs all async tests, updates output object with result
 * @param {Promise} testPromise the actual test callback or promise
 */
export const runAsync = (testPromise) => {
    const { fieldName, statement, severity, parent } = testPromise;

    parent.result.markAsync(fieldName);

    const done = () => {
        clearPendingTest(testPromise);
        if (!hasRemainingPendingTests(parent, fieldName)) {
            parent.result.markAsDone(fieldName);
        }

        if (!hasRemainingPendingTests(parent)) {
            parent.result.markAsDone();
        }
    };

    const fail = (rejectionMessage) => {
        const message = typeof rejectionMessage === 'string'
            ? rejectionMessage
            : statement;

        if (parent.pending.includes(testPromise)) {
            parent.result.fail(fieldName, message, severity);
        }

        done();
    };

    try {
        testPromise.then(done, fail);
    } catch (e) {
        fail();
    }
};

/**
 * Clears pending test from parent context
 * @param {Promise} testPromise the actual test callback or promise
 */
const clearPendingTest = (testPromise) => {
    testPromise.parent.pending = testPromise.parent.pending.filter((t) => t !== testPromise);
};

/**
 * Checks if there still are remaining pending tests for given criteria
 * @param {Object} parent Parent context
 * @param {String} fieldName name of the field to test against
 * @return {Boolean}
 */
const hasRemainingPendingTests = (parent, fieldName) => {
    if (!parent.pending.length) {
        return false;
    }

    if (fieldName) {
        return parent.pending.some((testPromise) => testPromise.fieldName === fieldName);
    }

    return !!parent.pending.length;
};

/**
 * Performs shallow run over test functions, assuming sync tests only. Returning result
 * @param {function | Promise} testFn the actual test callback or promise
 * @return {*} result from test function
 */
const preRun = (testFn) => {
    let result;
    try {
        result = testFn();
    } catch (e) {
        result = false;
    }
    if (result === false) {
        testFn.parent.result.fail(testFn.fieldName, testFn.statement, testFn.severity);
    }

    return result;
};

/**
 * Registers all supplied tests, if async - adds to pending array
 * @param {function | Promise} testFn the actual test callback or promise
 */
const register = (testFn) => {
    const { parent, fieldName } = testFn;
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
        result = preRun(testFn);
    }

    if (result && typeof result.then === 'function') {
        pending = true;
        testFn = Object.assign(result, testFn);
    }

    if (pending) {
        parent.pending.push(testFn);
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
 @param {String} [statement] the message shown to the user in case of a failure
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

    if (!testFn) {
        return;
    }

    if (typeof testFn.then === 'function' || typeof testFn === 'function') {
        Object.assign(testFn, {
            fieldName,
            statement,
            severity,
            parent: ctx.parent
        });

        register(testFn);
    }
};

export default test;
