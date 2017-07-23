// @flow
function initResponseObject(name: string) {
    return {
        name,
        hasValidationErrors: false,
        hasValidationWarnings: false,
        failCount: 0,
        warnCount: 0,
        testCount: 0,
        testsPerformed: {},
        validationErrors: {},
        validationWarnings: {},
        skipped: []
    };
}

export default initResponseObject;