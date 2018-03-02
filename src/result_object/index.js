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
     * Getall the errors of a field, or of the whole object
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
     * Getall the warnings of a field, or of the whole object
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
    skipped: Array<string>
    fail: Function;
}

export default ResultObject;