// @flow

import ctx from '../context';

/**
 * Runs all async tests, updates output object with result
 * @param {Promise} testPromise the actual test callback or promise
 */
export const runAsync: Function = (testPromise: AsyncTest) => {
    const { fieldName, statement, severity, parent }: TestProperties = testPromise;

    parent.result.markAsync(fieldName);

    const done: Function = () => {
        clearPendingTest(testPromise);
        if (!hasRemainingPendingTests(parent, fieldName)) {
            parent.result.markAsDone(fieldName);
        }

        if (!hasRemainingPendingTests(parent)) {
            parent.result.markAsDone();
        }
    };

    const fail: Function = () => {
        if (parent.pending.includes(testPromise)) {
            parent.result.fail(fieldName, statement, severity);
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
const clearPendingTest: Function = (testPromise: AsyncTest) => {
    testPromise.parent.pending = testPromise.parent.pending.filter((t) => t !== testPromise);
};

/**
 * Checks if there still are remaining pending tests for given criteria
 * @param {Object} parent Parent context
 * @param {String} fieldName name of the field to test against
 * @return {Boolean}
 */
const hasRemainingPendingTests: Function = (parent: ParentContext, fieldName: string) => {
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
const preRun: Function = (testFn: PassableTest) => {
    let result: AnyValue;
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
const register: Function = (testFn: PassableTest) => {
    const { parent, fieldName }: TestProperties = testFn;
    let pending: boolean = false;
    let result: AnyValue;

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
        // $FlowFixMe <- can't convince flow I actually refined here
        parent.pending.push(testFn);
    }
};

/**
 * The function used by the consumer
 * @param {String} fieldName name of the field to test against
 * @param {String} statement the message shown to the user in case of a failure
 * @param {function | Promise} testFn the actual test callback or promise
 * @param {String} Severity indicates whether the test should fail or warn
 */
const test: Function = (fieldName: string, statement: string, testFn: PassableTest, severity: Severity) => {
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