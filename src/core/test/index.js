import { FAIL } from '../../constants';
import { singleton } from '../../lib';
import { isTestFn, TestObject } from './lib';

/**
 * Run async test.
 * @param {TestObject} testObject A TestObject instance.
 */
export const runAsync = (testObject) => {
    const { fieldName, testFn, statement, ctx } = testObject;

    ctx.result.markAsync(fieldName);

    const done = () => {
        testObject.clearPending();

        if (!hasRemainingPendingTests(ctx, fieldName)) {
            ctx.result.markAsDone(fieldName);
        }

        if (!hasRemainingPendingTests(ctx)) {
            ctx.result.markAsDone();
        }
    };

    const fail = (rejectionMessage) => {
        testObject.statement = typeof rejectionMessage === 'string'
            ? rejectionMessage
            : statement;

        if (ctx.pending.includes(testObject)) {
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
 * @param {Object} ctx          Parent context
 * @param {String} [fieldName]  Name of the field to test against
 * @return {Boolean}
 */
const hasRemainingPendingTests = (ctx, fieldName) => {
    if (!ctx.pending.length) {
        return false;
    }

    if (fieldName) {
        return ctx.pending.some((testObject) => testObject.fieldName === fieldName);
    }

    return !!ctx.pending.length;
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
    const { testFn, ctx, fieldName } = testObject;
    let pending = false;
    let result;

    if (ctx.specific.excludes(fieldName)) {
        ctx.result.addToSkipped(fieldName);
        return;
    }

    ctx.result.initFieldCounters(fieldName);
    ctx.result.bumpTestCounter(fieldName);

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

    if (isTestFn(args[0])) {
        [testFn, severity] = args;
    } else if (['string', 'object'].some((type) => typeof args[0] === type)) {
        [statement, testFn, severity] = args;
    }

    if (!isTestFn(testFn)) {
        return;
    }

    const testObject = new TestObject(
        singleton.use().ctx,
        fieldName,
        statement,
        testFn,
        severity || FAIL
    );

    register(testObject);

    return testObject;
};

export default test;
