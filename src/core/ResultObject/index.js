export const WARN = 'warn';
export const FAIL = 'fail';
const severities = [WARN, FAIL];

const resultObject = (name) => {
    const res = {
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

    const completionCallbacks = [];
    let asyncObject = null;

    const initFieldCounters = (fieldName) => {
        if (res.testsPerformed[fieldName]) { return res; }

        res.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };
    };

    const bumpTestCounter = (fieldName) => {
        if (!res.testsPerformed[fieldName]) { return res; }

        res.testsPerformed[fieldName].testCount++;
        res.testCount++;
    };

    const bumpTestWarning = (fieldName, statement) => {
        res.hasValidationWarnings = true;
        res.validationWarnings[fieldName] = res.validationWarnings[fieldName] || [];
        res.validationWarnings[fieldName].push(statement);
        res.warnCount++;
        res.testsPerformed[fieldName].warnCount++;
    };

    const bumpTestError = (fieldName, statement) => {
        res.hasValidationErrors = true;
        res.validationErrors[fieldName] = res.validationErrors[fieldName] || [];
        res.validationErrors[fieldName].push(statement);
        res.failCount++;
        res.testsPerformed[fieldName].failCount++;
    };

    const fail = (fieldName, statement, severity) => {
        if (!res.testsPerformed[fieldName]) { return res; }

        const selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    const addToSkipped = (fieldName) => {
        !res.skipped.includes(fieldName) && res.skipped.push(fieldName);
    };

    const runCompletionCallbacks = () => {
        completionCallbacks.forEach((cb) => cb(res));
    };

    res.done = (callback) => {
        if (typeof callback !== 'function') {return res;}

        if (!asyncObject) {
            callback(res);
        }

        completionCallbacks.push(callback);
        return res;
    };

    res.after = (fieldName, callback) => {

        if (typeof callback !== 'function') {
            return res;
        }

        asyncObject = asyncObject || {};
        if (!asyncObject[fieldName] && res.testsPerformed[fieldName]) {
            callback(res);
        } else if (asyncObject[fieldName]) {
            asyncObject[fieldName].callbacks = [...(asyncObject[fieldName].callbacks || []), callback];
        }

        return res;
    };

    const markAsync = (fieldName) => {
        asyncObject = asyncObject || {};
        asyncObject[fieldName] = { done: false };
    };

    const markAsDone = (fieldName) => {
        if (asyncObject !== null && asyncObject[fieldName]) {
            asyncObject[fieldName].done = true;

            // run field callbacks set in `after`
            if (asyncObject[fieldName].callbacks) {
                asyncObject[fieldName].callbacks.forEach((callback) => callback(res));
            }
        }
    };

    res.getErrors = (fieldName) => {
        if (!fieldName) {
            return res.validationErrors;
        }

        if (res.validationErrors[fieldName]) {
            return res.validationErrors[fieldName];
        }

        return [];
    };

    res.getWarnings = (fieldName) => {
        if (!fieldName) {
            return res.validationWarnings;
        }

        if (res.validationWarnings[fieldName]) {
            return res.validationWarnings[fieldName];
        }

        return [];
    };

    res.hasErrors = (fieldName) => {
        if (!fieldName) {
            return res.hasValidationErrors;
        }

        return Boolean(res.getErrors(fieldName).length);
    };

    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */
    res.hasWarnings = (fieldName) => {
        if (!fieldName) {
            return res.hasValidationWarnings;
        }

        return Boolean(res.getWarnings(fieldName).length);
    };

    return {
        initFieldCounters,
        bumpTestError,
        bumpTestWarning,
        bumpTestCounter,
        fail,
        addToSkipped,
        runCompletionCallbacks,
        markAsync,
        markAsDone,
        result: res
    };
};

export default resultObject;