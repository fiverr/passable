import Tests from './tests/Tests';

const WARN = 'warn',
    FAIL = 'fail',
    FUNCTION = 'function',
    STRING = 'string';

class Passable {

    constructor(name, ...args) {

        const passables = args.slice(-1)[0];

        this.name = name;
        this.hasValidationErrors = false;
        this.hasValidationWarnings = false;
        this.testsPerformed = {};
        this.validationErrors = {};
        this.validationWarnings = {};
        this.failCount = 0;
        this.warnCount = 0;
        this.testCount = 0;

        if (typeof passables === FUNCTION) {
            passables(this.pass.bind(this), this);
        }
    }

    pass(dataName, statement, ...args) {

        const callback = args.slice(-1)[0];

        let severity = FAIL,
            isValid  = true;

        if (typeof callback === FUNCTION) {
            isValid = callback();
        }

         if (typeof args[0] === STRING) {
            severity = args[0] === WARN ? WARN : FAIL;
        }

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