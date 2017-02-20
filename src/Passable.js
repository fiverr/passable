import Tests from './tests/Tests';

const OPTIMISTIC = 'optimistic',
    PESSIMISTIC = 'pessimistic',
    WARN = 'warn',
    FAIL = 'fail';

class Passable {

    constructor(name, ...args) {

        let passables = args[0],
            operationMode = OPTIMISTIC;

        if (typeof args[1] === 'function') {
            passables = args[1];
            operationMode = args[0] === PESSIMISTIC ? args[0] : operationMode;
        }

        this.name = name;
        this.hasValidationErrors = false;
        this.hasValidationWarnings = false;
        this.testsPerformed = {};
        this.validationErrors = {};
        this.validationWarnings = {};
        this.failCount = 0;
        this.warnCount = 0;
        this.testCount = 0;

        passables(this.pass.bind(this), this);

        if ((this.testCount === 0) && (operationMode === PESSIMISTIC)) {
            this.hasValidationErrors = true;
        }
    }

    pass(dataName, statement, ...args) {

        let callback = args[0],
            severity = FAIL;

         if (typeof args[1] === 'function') {
            callback = args[1];
            severity = args[0] === WARN ? args[0] : FAIL;
        }

        const isValid = callback();

        if (!this.testsPerformed.hasOwnProperty(dataName)) {
            this.testsPerformed[dataName] = {
                testCount: 0,
                failCount: 0,
                warnCount: 0
            };
        }

        if (!isValid) {
            severity === FAIL ? this.onError(dataName, statement) : this.onWarn(dataName, statement);
        }

        this.testsPerformed[dataName].testCount++;
        this.testCount++;
    }

    onError(dataName, statement) {
        this.hasValidationErrors = true;
        this.validationErrors[dataName] = this.validationErrors[dataName] || [];
        this.validationErrors[dataName].push(statement);
        this.failCount++;
        this.testsPerformed[dataName].failCount++;
    }

    onWarn(dataName, statement) {
        this.hasValidationWarnings = true;
        this.validationWarnings[dataName] = this.validationWarnings[dataName] || [];
        this.validationWarnings[dataName].push(statement);
        this.warnCount++;
        this.testsPerformed[dataName].warnCount++;
    }

    run(value, test, testAgainst) {

        if (typeof Tests[test] === "function") {
            return Tests[test](value, testAgainst);
        }
    }

    enforce(value, tests) {

        let isValid = true;

        for (const test in tests) {
            const testData = tests[test],
                result = this.run(value, test, testData.testAgainst);

            if (!testData.hasOwnProperty('expect')) {
                testData.expect = true;
            }

            if (testData.expect !== result) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }
}

module.exports = Passable;