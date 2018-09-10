// @flow

import { testRunner, testRunnerAsync } from './test_runner';
import ResultObject from './result_object';
import { runtimeError } from './helpers';
import Specific from './Specific';
import { Errors } from './constants/';

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
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }

        if (typeof tests !== 'function') {
            throw runtimeError(Errors.MISSING_ARGUMENT_TESTS, typeof tests);
        }

        this.specific = new Specific(specific);

        this.res = new ResultObject(name);

        tests(this.test);
        this.runPendingTests();
    }

    addPendingTest = (test: PassableTest) => this.pending.push(test);
    clearPendingTest = (test: PassableTest) => {

        // $FlowFixMe
        this.pending = this.pending.filter((t: PassableTest): boolean => t !== test);
        if (this.pending.length === 0) {
            this.res.runCompletionCallbacks();
        }
    };

    /**
     * Test function passed over to the consumer.
     * It initiates field validation, and adds te test to the pending tests list
     * @param {string} fieldName the name of the field being validated
     * @param {string} statement description of the test
     * @param {function} test the actual test callback or promise
     */
    test = (fieldName: string, statement: string, test: PassableTest, severity: Severity) => {

        if (this.specific.excludes(fieldName)) {
            this.res.addToSkipped(fieldName);
            return;
        }

        this.res.initFieldCounters(fieldName);

        if (typeof test !== 'function' && !(test instanceof Promise)) {
            return;
        }

        test.fieldName = fieldName;
        test.statement = statement;
        test.severity = severity;

        this.addPendingTest(test);
    }

    /**
     * Runs all pending tests, clears pending tests list and bumps counters
     */
    runPendingTests = () => {
        [...this.pending].forEach((test) => {
            if (test instanceof Promise) {
                const done: Function = () => {
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
        });
    }
}

export default Passable;