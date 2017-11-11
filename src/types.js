// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types

declare type Rules = {
    [name: string]: Function
};

declare type Tests = {
    [name: string]: mixed
};

declare type Specific = Array<string> | string;

declare type PassRunnerCallback = {
    valid: boolean
} | void | null;

declare type NumStrBool = number | string | boolean;

declare type ArrayReducedToObject = {
    [name: string]: mixed
};

declare type EnforceSelf = {
    [testRunner: string]: Function,
    fin: Function,
    valid?: boolean
};

declare type Severity = 'warn' | 'fail';

declare type PassableArguments = Array<Passes | Specific | Rules>;

declare type Pass = () => void;
declare type Enforce = (AnyValue) => void;
declare type Passes = (pass: Pass, enforce: Enforce) => void;

declare type PassableRuntime = {
    specific: Specific,
    passes: Passes,
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