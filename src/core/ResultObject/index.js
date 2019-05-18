export const WARN = 'warn';
export const FAIL = 'fail';
const severities = [WARN, FAIL];

const resultObject = (name) => {

    const result = {
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

    const methods = {};

    const completionCallbacks = [];
    let asyncObject = null;

    methods.initFieldCounters = (fieldName) => {
        if (result.testsPerformed[fieldName]) { return result; }

        result.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };
    };

    methods.bumpTestCounter = (fieldName) => {
        if (!result.testsPerformed[fieldName]) { return result; }

        result.testsPerformed[fieldName].testCount++;
        result.testCount++;
    };

    const bumpTestWarning = (fieldName, statement) => {
        result.hasValidationWarnings = true;
        result.validationWarnings[fieldName] = result.validationWarnings[fieldName] || [];
        result.validationWarnings[fieldName].push(statement);
        result.warnCount++;
        result.testsPerformed[fieldName].warnCount++;
    };

    const bumpTestError = (fieldName, statement) => {
        result.hasValidationErrors = true;
        result.validationErrors[fieldName] = result.validationErrors[fieldName] || [];
        result.validationErrors[fieldName].push(statement);
        result.failCount++;
        result.testsPerformed[fieldName].failCount++;
    };

    methods.fail = (fieldName, statement, severity) => {
        if (!result.testsPerformed[fieldName]) { return result; }

        const selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    methods.addToSkipped = (fieldName) => {
        !result.skipped.includes(fieldName) && result.skipped.push(fieldName);
    };

    methods.runCompletionCallbacks = () => {
        completionCallbacks.forEach((cb) => cb(result));
    };

    result.done = (callback) => {
        if (typeof callback !== 'function') {return result;}

        if (!asyncObject) {
            callback(result);
        }

        completionCallbacks.push(callback);
        return result;
    };

    result.after = (fieldName, callback) => {

        if (typeof callback !== 'function') {
            return result;
        }

        asyncObject = asyncObject || {};

        if (!asyncObject[fieldName] && result.testsPerformed[fieldName]) {
            callback(result);
        } else if (asyncObject[fieldName]) {
            asyncObject[fieldName].callbacks = [...(asyncObject[fieldName].callbacks || []), callback];
        }

        return result;
    };

    methods.markAsync = (fieldName) => {
        asyncObject = asyncObject || {};
        asyncObject[fieldName] = { done: false };
    };

    methods.markAsDone = (fieldName) => {
        if (asyncObject !== null && asyncObject[fieldName]) {
            asyncObject[fieldName].done = true;

            // run field callbacks set in `after`
            if (asyncObject[fieldName].callbacks) {
                asyncObject[fieldName].callbacks.forEach((callback) => callback(result));
            }
        }
    };

    result.getErrors = (fieldName) => {
        if (!fieldName) {
            return result.validationErrors;
        }

        if (result.validationErrors[fieldName]) {
            return result.validationErrors[fieldName];
        }

        return [];
    };

    result.getWarnings = (fieldName) => {
        if (!fieldName) {
            return result.validationWarnings;
        }

        if (result.validationWarnings[fieldName]) {
            return result.validationWarnings[fieldName];
        }

        return [];
    };

    result.hasErrors = (fieldName) => {
        if (!fieldName) {
            return result.hasValidationErrors;
        }

        return Boolean(result.getErrors(fieldName).length);
    };

    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */
    result.hasWarnings = (fieldName) => {
        if (!fieldName) {
            return result.hasValidationWarnings;
        }

        return Boolean(result.getWarnings(fieldName).length);
    };

    return {
        result,
        methods
    };
};

export default resultObject;