// @flow

import { WARN, FAIL } from '../../constants';
const severities: string[] = [ WARN, FAIL ];

type AsyncObject = null | {
    [fieldName: string]: {
        done: boolean,
        callbacks: Function[]
    }
};

const passableResult: Function = (name: string): PassableResult => {

    const completionCallbacks: Function[] = [];
    let asyncObject: AsyncObject = null;
    let hasValidationErrors: boolean = false;
    let hasValidationWarnings: boolean = false;

    /**
     * Initializes specific field's counters
     * @param {string} fieldName - The name of the field.
     */
    const initFieldCounters: Function = (fieldName: string) => {
        if (output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };

        output.errors[fieldName] = output.errors[fieldName] || [];
        output.warnings[fieldName] = output.warnings[fieldName] || [];
    };

    /**
     * Bumps test counters to indicate tests that's being performed
     * @param {string} fieldName - The name of the field.
     */
    const bumpTestCounter: Function = (fieldName: string) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName].testCount++;
        output.testCount++;
    };

    /**
     * Bumps field's warning counts and adds warning string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */
    const bumpTestWarning: Function = (fieldName: string, statement: string) => {
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
    const bumpTestError: Function = (fieldName: string, statement: string) => {
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
    const fail: Function = (fieldName: string, statement: string, severity: Severity) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        const selectedSeverity: Severity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    /**
     * Uniquely add a field to the `skipped` list
     * @param {string} fieldName
     */
    const addToSkipped: Function = (fieldName: string) => {
        !output.skipped.includes(fieldName) && output.skipped.push(fieldName);
    };

    /**
     * Runs completion callbacks aggregated by `done`
     * regardless of success or failure
     */
    const runCompletionCallbacks: Function = () => {
        completionCallbacks.forEach((cb) => cb(output));
    };

    /**
     * Marks a field as async
     * @param {string} fieldName the name of the field marked as async
    */
    const markAsync: Function = (fieldName: string) => {
        asyncObject = asyncObject || {};
        asyncObject[fieldName] = asyncObject[fieldName] || {};
        asyncObject[fieldName] = {
            done: false,
            callbacks: asyncObject[fieldName].callbacks || []
        };
    };

    /**
     * Marks an async field as done
     * @param {string} fieldName the name of the field marked as done
    */
    const markAsDone: Function = (fieldName: string) => {
        if (asyncObject !== null && asyncObject[fieldName]) {
            asyncObject[fieldName].done = true;

            // run field callbacks set in `after`
            if (asyncObject[fieldName].callbacks) {
                asyncObject[fieldName].callbacks.forEach((callback) => callback(output));
            }

            runCompletionCallbacks();
        }
    };

    /**
     * Registers callback functions to be run when test suite is done running
     * If current suite is not async, runs the callback immediately
     * @param {function} callback the function to be called on done
     * @return {object} output object
     */
    const done: Function = (callback: Function) => {
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
     * @param {function} callback the function to be called on done
     * @return {object} output object
     */
    const after: Function = (fieldName: string, callback) => {
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
     * Gets all the errors of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's errors, or all errors
     */
    const getErrors: Function = (fieldName: string) => {
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
     * @return {Array | Object} The field's warnings, or all warnings
     */
    const getWarnings: Function = (fieldName: string) => {
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
    const hasErrors: Function = (fieldName: string) => {
        if (!fieldName) {
            return hasValidationErrors;
        }

        return Boolean(output.getErrors(fieldName).length);
    };

    /**
     * Checks if a certain field (or the whole suite) has warnings
     * @param {string} [fieldName]
     * @return {boolean}
     */
    const hasWarnings: Function = (fieldName: string) => {
        if (!fieldName) {
            return hasValidationWarnings;
        }

        return Boolean(output.getWarnings(fieldName).length);
    };

    const output: PassableOutput = {
        name,
        failCount: 0,
        warnCount: 0,
        testCount: 0,
        testsPerformed: {},
        errors: {},
        warnings: {},
        skipped: [],
        hasErrors,
        hasWarnings,
        getErrors,
        getWarnings,
        done,
        after
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