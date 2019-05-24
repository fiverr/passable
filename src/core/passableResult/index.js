import { WARN, FAIL } from '../../constants';
const severities = [WARN, FAIL];

const passableResult = (name) => {
    const output = {
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
        if (output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };
    };

    const bumpTestCounter = (fieldName) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName].testCount++;
        output.testCount++;
    };

    const bumpTestWarning = (fieldName, statement) => {
        output.hasValidationWarnings = true;
        output.validationWarnings[fieldName] = output.validationWarnings[fieldName] || [];
        output.validationWarnings[fieldName].push(statement);
        output.warnCount++;
        output.testsPerformed[fieldName].warnCount++;
    };

    const bumpTestError = (fieldName, statement) => {
        output.hasValidationErrors = true;
        output.validationErrors[fieldName] = output.validationErrors[fieldName] || [];
        output.validationErrors[fieldName].push(statement);
        output.failCount++;
        output.testsPerformed[fieldName].failCount++;
    };

    const fail = (fieldName, statement, severity) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        const selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    const addToSkipped = (fieldName) => {
        !output.skipped.includes(fieldName) && output.skipped.push(fieldName);
    };

    const runCompletionCallbacks = () => {
        completionCallbacks.forEach((cb) => cb(output));
    };

    output.done = (callback) => {
        if (typeof callback !== 'function') {return output;}

        if (!asyncObject) {
            callback(output);
        }

        completionCallbacks.push(callback);
        return output;
    };

    output.after = (fieldName, callback) => {

        if (typeof callback !== 'function') {
            return output;
        }

        asyncObject = asyncObject || {};
        if (!asyncObject[fieldName] && output.testsPerformed[fieldName]) {
            callback(output);
        } else if (asyncObject[fieldName]) {
            asyncObject[fieldName].callbacks = [...(asyncObject[fieldName].callbacks || []), callback];
        }

        return output;
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
                asyncObject[fieldName].callbacks.forEach((callback) => callback(output));
            }
        }
    };

    output.getErrors = (fieldName) => {
        if (!fieldName) {
            return output.validationErrors;
        }

        if (output.validationErrors[fieldName]) {
            return output.validationErrors[fieldName];
        }

        return [];
    };

    output.getWarnings = (fieldName) => {
        if (!fieldName) {
            return output.validationWarnings;
        }

        if (output.validationWarnings[fieldName]) {
            return output.validationWarnings[fieldName];
        }

        return [];
    };

    output.hasErrors = (fieldName) => {
        if (!fieldName) {
            return output.hasValidationErrors;
        }

        return Boolean(output.getErrors(fieldName).length);
    };

    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */
    output.hasWarnings = (fieldName) => {
        if (!fieldName) {
            return output.hasValidationWarnings;
        }

        return Boolean(output.getWarnings(fieldName).length);
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
        output
    };
};

export default passableResult;