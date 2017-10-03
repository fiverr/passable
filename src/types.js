// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types

declare type Rules = {
    [name: string]: Function
};

declare type Tests = {
    [name: string]: mixed
};

declare type Specific = Array<string> | string | void;

declare type PassRunnerCallback = {
    valid: boolean
} | void | null;

declare type ArrayReducedToObject = {
    [name: string]: mixed
};

declare type EnforceSelf = {
    allOf: Function,
    noneOf: Function,
    anyOf: Function,
    fin: Function,
    valid?: boolean
};

declare type Severity = 'warn' | 'fail';

declare type PassableArguments = Array<string | Array<string> | Object | Function>; // eslint-disable-line flowtype/no-weak-types

declare type PassableRuntime = {
    passes: Function,
    specific: Specific,
    custom: Rules
};

declare type PassableResponse = {
    [name: string]: string,
    hasValidationErrors: boolean,
    hasValidationWarnings: boolean,
    failCount: number,
    warnCount: number,
    testCount: number,
    testsPerformed: {
        [name: string]: {
            testCount: number,
            failCount: number,
            warnCount: number
        }
    },
    validationErrors: {
        [name: string]: Array<string>
    },
    validationWarnings: {
        [name: string]: Array<string>
    },
    skipped: Array<string>
}