import { WARN, FAIL } from '../../constants';
const severities = [ WARN, FAIL ];

const passableResult = (name) => {

    const completionCallbacks = [];
    let asyncObject = null;
    let hasValidationErrors = false;
    let hasValidationWarnings = false;
    let cancelled = false;

    /**
     * Initializes specific field's counters
     * @param {string} fieldName - The name of the field.
     */
    const initFieldCounters = (fieldName) => {
        if (output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };
    };

    /**
     * Bumps test counters to indicate tests that's being performed
     * @param {string} fieldName - The name of the field.
     */
    const bumpTestCounter = (fieldName) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName].testCount++;
        output.testCount++;
    };

    /**
     * Bumps field's warning counts and adds warning string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */
    const bumpTestWarning = (fieldName, statement) => {
        hasValidationWarnings = true;
        output.warnings[fieldName] = output.warnings[fieldName] || [];
        output.warnings[fieldName].push(statement);
        output.warnCount++;
        output.testsPerformed[fieldName].warnCount++;
    };

    /**
     * Bumps field's error counts and adds error string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */
    const bumpTestError = (fieldName, statement) => {
        hasValidationErrors = true;
        output.errors[fieldName] = output.errors[fieldName] || [];
        output.errors[fieldName].push(statement);
        output.failCount++;
        output.testsPerformed[fieldName].failCount++;
    };

    /**
     * Fails a field and updates output accordingly
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     * @param {string} severity - Whether it is a `fail` or `warn` test.
     */
    const fail = (fieldName, statement, severity) => {
        if (!output.testsPerformed[fieldName]) { return output; }
        const selectedSeverity = severity && severities.includes(severity) ? severity : FAIL;
        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    /**
     * Uniquely add a field to the `skipped` list
     * @param {string} fieldName - The name of the field.
     */
    const addToSkipped = (fieldName) => {
        !output.skipped.includes(fieldName) && output.skipped.push(fieldName);
    };

    /**
     * Runs completion callbacks aggregated by `done`
     * regardless of success or failure
     */
    const runCompletionCallbacks = () => {
        completionCallbacks.forEach((cb) => !cancelled && cb(output));
    };

    /**
     * Marks a field as async
     * @param {string} fieldName - The name of the field.
    */
    const markAsync = (fieldName) => {
        asyncObject = asyncObject || {};
        asyncObject[fieldName] = asyncObject[fieldName] || {};
        asyncObject[fieldName] = {
            done: false,
            callbacks: asyncObject[fieldName].callbacks || []
        };
    };

    /**
     * Marks an async field as done
     * @param {string} fieldName - The name of the field.
    */
    const markAsDone = (fieldName) => {
        if (!fieldName) {
            return runCompletionCallbacks();
        }

        if (asyncObject !== null && asyncObject[fieldName]) {
            asyncObject[fieldName].done = true;

            // run field callbacks set in `after`
            if (asyncObject[fieldName].callbacks) {
                asyncObject[fieldName].callbacks.forEach((callback) => !cancelled && callback(output));
            }
        }
    };

    /**
     * Registers callback functions to be run when test suite is done running
     * If current suite is not async, runs the callback immediately
     * @param {function} callback the function to be called on done
     * @return {object} output object
     */
    const done = (callback) => {
        if (typeof callback !== 'function') {return output;}
        if (!asyncObject) {
            callback(output);
        }

        completionCallbacks.push(callback);
        return output;
    };

    /**
     * Registers callback functions to be run when a certain field is done running
     * If field is not async, runs the callback immediately
     * @param {string} fieldName - The name of the field.
     * @param {function} callback the function to be called on done
     * @return {object} output object
     */
    const after = (fieldName, callback) => {
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

    /**
     * cancels done/after callbacks. They won't invoke when async operations complete
     */
    const cancel = () => {
        cancelled = true;

        return output;
    };

    /**
     * Gets all the errors of a field, or of the whole object
     * @param {string} fieldName - The name of the field.
     * @return {array | object} The field's errors, or all errors
     */
    const getErrors = (fieldName) => {
        if (!fieldName) {
            return output.errors;
        }

        if (output.errors[fieldName]) {
            return output.errors[fieldName];
        }

        return [];
    };

    /**
     * Gets all the warnings of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {array | object} The field's warnings, or all warnings
     */
    const getWarnings = (fieldName) => {
        if (!fieldName) {
            return output.warnings;
        }

        if (output.warnings[fieldName]) {
            return output.warnings[fieldName];
        }

        return [];
    };

    /**
     * Checks if a certain field (or the whole suite) has errors
     * @param {string} [fieldName]
     * @return {boolean}
     */
    const hasErrors = (fieldName) => {
        if (!fieldName) {
            return hasValidationErrors;
        }

        return Boolean(output.getErrors(fieldName).length);
    };

    /**
     * Checks if a certain field (or the whole suite) has warnings
     * @param {string} [fieldName] - The name of the field.
     * @return {boolean}
     */
    const hasWarnings = (fieldName) => {
        if (!fieldName) {
            return hasValidationWarnings;
        }

        return Boolean(output.getWarnings(fieldName).length);
    };

    const output = {
        name,
        failCount: 0,
        warnCount: 0,
        testCount: 0,
        testsPerformed: {},
        errors: {},
        warnings: {},
        skipped: []
    };

    Object.defineProperties(output, {
        hasErrors: {
            value: hasErrors,
            writable: true,
            configurable: true,
            enumerable: false
        },
        hasWarnings: {
            value: hasWarnings,
            writable: true,
            configurable: true,
            enumerable: false
        },
        getErrors: {
            value: getErrors,
            writable: true,
            configurable: true,
            enumerable: false
        },
        getWarnings: {
            value: getWarnings,
            writable: true,
            configurable: true,
            enumerable: false
        },
        done: {
            value: done,
            writable: true,
            configurable: true,
            enumerable: false
        },
        after: {
            value: after,
            writable: true,
            configurable: true,
            enumerable: false
        },
        cancel: {
            value: cancel,
            writable: true,
            configurable: true,
            enumerable: false
        }
    });

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