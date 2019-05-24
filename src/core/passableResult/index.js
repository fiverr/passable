// @flow

import { WARN, FAIL } from '../../constants';
import { createDiffieHellman } from 'crypto';
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

    const initFieldCounters: Function = (fieldName: string) => {
        if (output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };
    };

    const bumpTestCounter: Function = (fieldName: string) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        output.testsPerformed[fieldName].testCount++;
        output.testCount++;
    };

    const bumpTestWarning: Function = (fieldName: string, statement: string) => {
        output.hasValidationWarnings = true;
        output.validationWarnings[fieldName] = output.validationWarnings[fieldName] || [];
        output.validationWarnings[fieldName].push(statement);
        output.warnCount++;
        output.testsPerformed[fieldName].warnCount++;
    };

    const bumpTestError: Function = (fieldName: string, statement: string) => {
        output.hasValidationErrors = true;
        output.validationErrors[fieldName] = output.validationErrors[fieldName] || [];
        output.validationErrors[fieldName].push(statement);
        output.failCount++;
        output.testsPerformed[fieldName].failCount++;
    };

    const fail: Function = (fieldName: string, statement: string, severity: Severity) => {
        if (!output.testsPerformed[fieldName]) { return output; }

        const selectedSeverity: Severity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? bumpTestWarning(fieldName, statement)
            : bumpTestError(fieldName, statement);
    };

    const addToSkipped: Function = (fieldName: string) => {
        !output.skipped.includes(fieldName) && output.skipped.push(fieldName);
    };

    const runCompletionCallbacks: Function = () => {
        completionCallbacks.forEach((cb) => cb(output));
    };

    const done: Function = (callback: Function) => {
        if (typeof callback !== 'function') {return output;}

        if (!asyncObject) {
            callback(output);
        }

        completionCallbacks.push(callback);
        return output;
    };

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

    const markAsync: Function = (fieldName: string) => {
        asyncObject = asyncObject || {};
        asyncObject[fieldName] = {
            done: false,
            callbacks: asyncObject[fieldName].callbacks || []
        };
    };

    const markAsDone: Function = (fieldName: string) => {
        if (asyncObject !== null && asyncObject[fieldName]) {
            asyncObject[fieldName].done = true;

            // run field callbacks set in `after`
            if (asyncObject[fieldName].callbacks) {
                asyncObject[fieldName].callbacks.forEach((callback) => callback(output));
            }
        }
    };

    const getErrors: Function = (fieldName: string) => {
        if (!fieldName) {
            return output.validationErrors;
        }

        if (output.validationErrors[fieldName]) {
            return output.validationErrors[fieldName];
        }

        return [];
    };

    const getWarnings: Function = (fieldName: string) => {
        if (!fieldName) {
            return output.validationWarnings;
        }

        if (output.validationWarnings[fieldName]) {
            return output.validationWarnings[fieldName];
        }

        return [];
    };

    const hasErrors: Function = (fieldName: string) => {
        if (!fieldName) {
            return output.hasValidationErrors;
        }

        return Boolean(output.getErrors(fieldName).length);
    };

    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */
    const hasWarnings: Function = (fieldName: string) => {
        if (!fieldName) {
            return output.hasValidationWarnings;
        }

        return Boolean(output.getWarnings(fieldName).length);
    };

    const output: PassableOutput = {
        name,
        hasValidationErrors: false,
        hasValidationWarnings: false,
        failCount: 0,
        warnCount: 0,
        testCount: 0,
        testsPerformed: {},
        validationErrors: {},
        validationWarnings: {},
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