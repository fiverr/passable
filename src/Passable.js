import Tests from './tests/Tests';

const WARN = 'warn',
    FAIL = 'fail',
    FUNCTION = 'function',
    STRING = 'string';

const Passable = (name, passables) => {

    let hasValidationErrors = false,
    hasValidationWarnings = false,
    failCount = 0,
    warnCount = 0,
    testCount = 0;

    const testsPerformed = {},
    validationErrors = {},
    validationWarnings = {};

    const pass = (dataName, statement, ...args) => {

        const callback = args.slice(-1)[0];

        let severity = FAIL,
            isValid  = true;

        if (typeof callback === FUNCTION) {
            isValid = callback();
        }

         if (typeof args[0] === STRING) {
            severity = args[0] === WARN ? WARN : FAIL;
        }

        if (!testsPerformed.hasOwnProperty(dataName)) {
            testsPerformed[dataName] = {
                testCount: 0,
                failCount: 0,
                warnCount: 0
            };
        }

        if (!isValid) {
            severity === FAIL ? onError(dataName, statement) : onWarn(dataName, statement);
        }

        testsPerformed[dataName].testCount++;
        testCount++;
    };

    const onError = (dataName, statement) => {
        hasValidationErrors = true;
        validationErrors[dataName] = validationErrors[dataName] || [];
        validationErrors[dataName].push(statement);
        failCount++;
        testsPerformed[dataName].failCount++;
    };

    const onWarn = (dataName, statement) => {
        hasValidationWarnings = true;
        validationWarnings[dataName] = validationWarnings[dataName] || [];
        validationWarnings[dataName].push(statement);
        warnCount++;
        testsPerformed[dataName].warnCount++;
    }

    const run = (value, test, testAgainst) => {

        if (typeof Tests[test] === "function") {
            return Tests[test](value, testAgainst);
        }
    };

    const enforce = (value, tests) => {

        let isValid = true;

        for (const test in tests) {
            const testData = tests[test],
                result = run(value, test, testData.testAgainst);

            if (!testData.hasOwnProperty('expect')) {
                testData.expect = true;
            }

            if (testData.expect !== result) {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    if (typeof passables === FUNCTION) {
        passables(pass, enforce);
    }

    return {
        name,
        hasValidationErrors,
        hasValidationWarnings,
        testsPerformed,
        validationErrors,
        validationWarnings,
        failCount,
        warnCount,
        testCount
    };
};

module.exports = Passable;