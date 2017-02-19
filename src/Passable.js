import Tests from './tests/Tests';

const OPTIMISTIC = 'optimistic',
    PESSIMISTIC  = 'pessimistic';

class Passable {

    constructor(name, ...args) {

        let passables,
            operationMode = OPTIMISTIC;

        if (typeof args[1] === 'function') {
            passables = args[1];
            operationMode = args[0] === PESSIMISTIC ? args[0] : operationMode;
        } else {
            passables = args[0];
        }

        this.name = name;
        this.testsPerformed = {};
        this.hasValidationErrors = false;
        this.validationErrors = {};
        this.failCount = 0;
        this.testCount = 0;

        passables(this, this.pass.bind(this));

        if ((this.testCount === 0) && (operationMode === PESSIMISTIC)) {
            this.hasValidationErrors = true;
        }
    }

    pass(dataName, statement, callback) {
        const isValid = callback();

        if (!this.testsPerformed.hasOwnProperty(dataName)) {
            this.testsPerformed[dataName] = {
                testCount: 0,
                failCount: 0
            };
        }

        if (!isValid) {
            this.testsPerformed[dataName].failCount++;
            this.hasValidationErrors = true;
            this.validationErrors[dataName] = this.validationErrors[dataName] || [];
            this.validationErrors[dataName].push(statement);
            this.failCount++;
        }

        this.testsPerformed[dataName].testCount++;
        this.testCount++;
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