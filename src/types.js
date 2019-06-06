// @flow
declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types
declare type ArrayOrStringOfArrays = string[] | string;
declare type NumStrBool = number | string | boolean;
declare type MapType = Map<mixed, mixed>;

// Validate function
declare type ValidityObject = {
    valid: boolean,
    message?: string
};

// Passable: Specific
declare type SpecificGroup = {
    [name: string]: boolean
};

declare type SpecificObject = {
    only?: SpecificGroup,
    not?: SpecificGroup
};

declare type SpecificField = string[] | string;
declare type SpecificArgs = void | SpecificField | {
    only: SpecificField,
    not: SpecificField
};

// Passable: Result Object
declare type ErrorAndWarningObject = {
    [name: string]: string[]
}

declare type AsyncObject = {
    [name: string]: {
        done: boolean,
        callbacks?: Array<Function>
    }
} | null;

// Test
declare type TestsWrapper = (test: TestProvider, draft: PassableOutput) => void;
declare type TestProvider = (fieldName: string, statemenpt: string, test: PassableTest, severity: Severity) => void;

declare type PassableTest = {
    (): void | () => boolean | Promise<void>,
    severity: Severity,
    fieldName: string,
    statement: string,
    then?: Function
};

// Test: Severity
declare type Severity = 'warn' | 'fail';


// Enforce: Instance
declare type EnforceInstance = (AnyValue) => EnforceRules;

// Enforce: Rules
declare type RuleArgs = Array<AnyValue>;
declare type EnforceRule = (value: AnyValue, ...args: AnyValue) => boolean;
declare type EnforceRules = {
    [ruleName: string]: EnforceRule
};

declare type NumericValue = number | string;

declare var PASSABLE_VERSION: string;

declare type StringOrArray = string | RuleArgs;

declare type Output = {
    name: String,
}

declare type PassableOutput = {
    name: string,
    hasValidationErrors: boolean,
    hasValidationWarnings: boolean,
    failCount: number,
    warnCount: number,
    testCount: number,
    testsPerformed: {
        [fieldName: string]: {
            testCount: number,
            failCount: number,
            warnCount: number
        }
    },
    validationErrors: {
        [fieldName: string]: string[]
    },
    validationWarnings: {
        [fieldName: string]: string[]
    },
    skipped: string[],
    hasErrors: (fieldName?: string) => boolean,
    hasWarnings: (fieldName?: string) => boolean,
    getErrors: (fieldName?: string) => string[] | { [fieldName: string]: string[] },
    getWarnings: (fieldName?: string) => string[] | { [fieldName: string]: string[] },
    done: ((output: PassableOutput) => void) => PassableOutput,
    after: ((output: PassableOutput) => void) => PassableOutput
};

declare type PassableResult = {
    initFieldCounters: (fieldName: string) => void,
    bumpTestCounter: (fieldName: string) => void,
    bumpTestError: (fieldName: string, statement: string) => void,
    bumpTestWarning: (fieldName: string, statement: string) => void,
    fail: (fieldName: string, statement: string, Severity: Severity) => void,
    addToSkipped: (fieldName: string) => void,
    runCompletionCallbacks: () => void,
    markAsync: (fieldName: string) => void,
    markAsDone: (fieldName: string) => void,
    output: PassableOutput
};

declare type GlobalObject = Object; // eslint-disable-line flowtype/no-weak-types