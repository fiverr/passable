// @flow

export const WARN: Severity = 'warn';
export const FAIL: Severity = 'fail';
const severities: Array<Severity> = [WARN, FAIL];

/** Class representing validation state. */
class ResultObject {
    /**
     * Initialize validation object
     * @param {string} name - The name of the current data object.
     * @return {Object} Current instance
     */
    constructor(name: string) {
        this.#async = null;
        this.name = name;
        this.hasValidationErrors = false;
        this.hasValidationWarnings = false;
        this.failCount = 0;
        this.warnCount = 0;
        this.testCount = 0;
        this.testsPerformed = {};
        this.validationErrors = {};
        this.validationWarnings = {};
        this.skipped = [];
        this.completionCallbacks = [];
    }

    /**
     * Initializes specific field's counters
     * @param {string} fieldName - The name of the field.
     * @return {Object} Current instance
     */
    initFieldCounters(fieldName: string) {
        if (this.testsPerformed[fieldName]) { return this; }

        this.testsPerformed[fieldName] = {
            testCount: 0,
            failCount: 0,
            warnCount: 0
        };

        return this;
    }

    /**
     * Bumps test counters
     * @param {string} fieldName - The name of the field.
     * @return {Object} Current instance
     */
    bumpTestCounter(fieldName: string) {
        if (!this.testsPerformed[fieldName]) { return this; }

        this.testsPerformed[fieldName].testCount++;
        this.testCount++;

        return this;
    }

    /**
     * Bumps field's warning counts and adds warning string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */
    bumpTestWarning(fieldName: string, statement: string) {
        this.hasValidationWarnings = true;
        this.validationWarnings[fieldName] = this.validationWarnings[fieldName] || [];
        this.validationWarnings[fieldName].push(statement);
        this.warnCount++;
        this.testsPerformed[fieldName].warnCount++;
    }

    /**
     * Bumps field's error counts and adds error string
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     */
    bumpTestError(fieldName: string, statement: string) {
        this.hasValidationErrors = true;
        this.validationErrors[fieldName] = this.validationErrors[fieldName] || [];
        this.validationErrors[fieldName].push(statement);
        this.failCount++;
        this.testsPerformed[fieldName].failCount++;
    }

    /**
     * Fails a field and updates object accordingly
     * @param {string} fieldName - The name of the field.
     * @param {string} statement - The error string to add to the object.
     * @param {string} severity - Whether it is a `fail` or `warn` test.
     * @return {Object} Current instance
     */
    fail(fieldName: string, statement: string, severity: Severity) {
        if (!this.testsPerformed[fieldName]) { return this; }

        const selectedSeverity: Severity = severity && severities.includes(severity) ? severity : FAIL;

        selectedSeverity === WARN
            ? this.bumpTestWarning(fieldName, statement)
            : this.bumpTestError(fieldName, statement);

        return this;
    }

    /**
     * Uniquely add a field to the `skipped` list
     * @param {string} fieldName
     * @return {Object} Current instance
     */
    addToSkipped(fieldName: string): this {
        !this.skipped.includes(fieldName) && this.skipped.push(fieldName);

        return this;
    }

    /**
     * Runs completion callbacks aggregated by `done`
     * regardless of success or failure
     */
    runCompletionCallbacks() {
        this.completionCallbacks.forEach((cb) => cb(this));
    }

    /**
     * Registers callback function to be run when test suite is done running
     * If current suite is not async, runs the callback immediately
     * @param {Function} callback the function to be called on done
     * @return {Object} Current instance
     */
    done(callback: Function) {
        if (typeof callback !== 'function') {return this;}

        if (!this.#async) {
            callback(this);
        }

        this.completionCallbacks.push(callback);
        return this;
    }

    /**
     * Registers a callback function to be run after a certain field finished running
     * If given field is sync, runs immediately
     * @param {String} fieldName name of the field to register the callback to
     * @param {Function} callback the function to be registered
     * @return {Object} Current instance
     */
    after(fieldName: string, callback: Function) {

        if (typeof callback !== 'function') {
            return this;
        }

        this.#async = this.#async || {};

        if (!this.#async[fieldName] && this.testsPerformed[fieldName]) {
            callback(this);
        } else if (this.#async[fieldName]) {
            this.#async[fieldName].callbacks = [...(this.#async[fieldName].callbacks || []), callback];
        }

        return this;
    }

    /**
     * Marks a field as async
     * @param {string} fieldName the name of the field marked as async
     * @return {Object} Current instance
    */
    markAsync(fieldName: string) {
        this.#async = this.#async || {};
        this.#async[fieldName] = { done: false };
        return this;
    }

    /**
     * Marks an async field as done
     * @param {string} fieldName the name of the field marked as done
     * @return {Object} Current instance
    */
    markAsDone(fieldName: string) {
        if (this.#async !== null && this.#async[fieldName]) {
            this.#async[fieldName].done = true;

            // run field callbacks set in `after`
            if (this.#async[fieldName].callbacks) {
                this.#async[fieldName].callbacks.forEach((callback) => callback(this));
            }
        }

        return this;
    }

    /**
     * Gets all the errors of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's errors, or all errors
     */
    getErrors(fieldName: string): Array<string> | ErrorAndWarningObject {
        if (!fieldName) {
            return this.validationErrors;
        }

        if (this.validationErrors[fieldName]) {
            return this.validationErrors[fieldName];
        }

        return [];
    }

    /**
     * Gets all the warnings of a field, or of the whole object
     * @param {string} [fieldName] - The name of the field.
     * @return {Array | Object} The field's warnings, or all warnings
     */
    getWarnings(fieldName: string): Array<string> | ErrorAndWarningObject {
        if (!fieldName) {
            return this.validationWarnings;
        }

        if (this.validationWarnings[fieldName]) {
            return this.validationWarnings[fieldName];
        }

        return [];
    }

    /**
     * Returns whether a field (or the whole suite, if none passed) contains errors
     * @param {string} [fieldName]
     */
    hasErrors(fieldName: string): boolean {
        if (!fieldName) {
            return this.hasValidationErrors;
        }

        return Boolean(this.getErrors(fieldName).length);
    }

    /**
     * Returns whether a field (or the whole suite, if none passed) contains warnings
     * @param {string} [fieldName]
     */
    hasWarnings(fieldName: string): boolean {
        if (!fieldName) {
            return this.hasValidationWarnings;
        }

        return Boolean(this.getWarnings(fieldName).length);
    }

    #async: AsyncObject;
    name: string;
    hasValidationErrors: boolean;
    hasValidationWarnings: boolean;
    failCount: number;
    warnCount: number;
    testCount: number;
    validationErrors: ErrorAndWarningObject;
    validationWarnings: ErrorAndWarningObject;
    testsPerformed: {
        [name: string]: {
            testCount: number,
            failCount: number,
            warnCount: number
        }
    };
    skipped: Array<string>;
    completionCallbacks: Array<Function>;
    fail: Function;
}

export default ResultObject;