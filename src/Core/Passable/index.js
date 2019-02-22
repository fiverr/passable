// @flow

import { testRunner, testRunnerAsync } from '../testRunner';
import ResultObject from '../ResultObject';
import Specific from '../Specific';

const constructorError: Function = (name: string, value: string, doc?: string): string => `[Passable]: failed during suite initialization. Unexpected '${typeof value}' for '${name}' argument.
    See: ${doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html'}`;

/**
 * Describes a passable validation suite
 */
class Passable {
    specific: Specific;
    res: ResultObject;
    test: TestProvider;
    pending: Array<PassableTest>;

    pending = [];

    /**
     * Initializes a validation suite, creates a new ResultObject instance and runs pending tests
     */
    constructor(name: string, tests: TestsWrapper, specific: ?SpecificArgs) {

        if (typeof name !== 'string') {
            throw new TypeError(constructorError('suite name', name));
        }

        if (typeof tests !== 'function') {
            throw new TypeError(constructorError('tests', tests));
        }

        if (specific && !Specific.is(specific)) {
            throw new TypeError(constructorError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
        }

        this.specific = new Specific(specific);

        this.res = new ResultObject(name);

        tests(this.test, this.res);
        this.runPendingTests();
    }

    addPendingTest = (test: PassableTest) => this.pending.push(test);
    clearPendingTest = (test: PassableTest) => {

        this.pending = (this.pending.filter((t: PassableTest): boolean => t !== test): Array<PassableTest>);
        if (this.pending.length === 0) {
            this.res.runCompletionCallbacks();
        }
    };

    /**
     * Test function passed over to the consumer.
     * It initiates field validation, and adds te test to the pending tests list
     * @param {string} fieldName the name of the field being validated
     * @param {string} statement description of the test
     * @param {function | Promise} test the actual test callback or promise
     */
    test = (fieldName: string, statement: string, test: PassableTest, severity: Severity) => {

        if (this.specific.excludes(fieldName)) {
            this.res.addToSkipped(fieldName);
            return;
        }

        this.res.initFieldCounters(fieldName);

        let operation: Function;

        if (typeof test === 'function') {
            operation = this.runTest;
        } else if (test instanceof Promise) {
            operation = this.addPendingTest;
        } else {
            return;
        }

        operation(Object.assign(test, {
            fieldName,
            statement,
            severity
        }));
    }

    /**
     * calls `runTest` on all pending tests, clears pending tests list and bumps counters
     * @param {function | Promise} test the actual test callback or promise
     */
    runTest = (test: PassableTest) => {
        if (test instanceof Promise) {

            this.res.markAsync(test.fieldName);

            const done: Function = () => {
                this.res.markAsDone(test.fieldName);
                this.clearPendingTest(test);
            };

            const fail: Function = () => {
                // order is important here! fail needs to be called before `done`.
                this.res.fail(test.fieldName, test.statement, test.severity);
                done();
            };

            testRunnerAsync(test, done, fail);
        } else {
            const isValid: boolean = testRunner(test);

            if (!isValid) {
                this.res.fail(test.fieldName, test.statement, test.severity);
            }
            this.clearPendingTest(test);
        }
        this.res.bumpTestCounter(test.fieldName);
    }

    /**
     * calls `runTest` on all pending tests, clears pending tests list and bumps counters
     */
    runPendingTests = () => {
        [...this.pending].forEach(this.runTest);
    }
}

export default Passable;