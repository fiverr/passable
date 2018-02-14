// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types

declare type Rules = {
    [name: string]: Function
};

declare type CompoundTestObject = {
    [rule: string]: AnyValue
};

declare type ArrayOrStringOfArrays = Array<string> | string;

declare type Specific = Array<string> | string | {
    only?: ArrayOrStringOfArrays,
    not?: ArrayOrStringOfArrays
};

declare type testRunnerCallback = {
    valid: boolean
} | void | null;

declare type NumStrBool = number | string | boolean;

declare type MapType = Map<mixed, mixed>;

declare type Severity = 'warn' | 'fail';
declare type TestsWrapper = (test: TestProvider) => void;
declare type TestProvider = (fieldName: string, statemenpt: string, test: TestFn, severity: Severity) => void;
declare type TestFn = () => void;

declare type PassableRuntime = {
    specific: SpecificObject,
    tests: TestsWrapper
};

declare type ValidityObject = {
    valid: boolean,
    message?: string
};

declare type SpecificObject = {
    only: Set<string>,
    not: Set<string>
};

declare type ErrorAndWarningObject = {
    [name: string]: Array<string>
};
declare type EnforceRule = (value: AnyValue, ...args: AnyValue) => boolean;
declare type EnforceRules = {
    [rule: string]: EnforceRule
};
declare type EnforceProxy = {
    [ruleName: string]: (value: AnyValue, ...args: AnyValue) => EnforceProxy;
};
declare type ProxiedRule = (value: AnyValue, ...args: AnyValue) => EnforceProxy;
declare type EnforceFunc = (AnyValue) => EnforceProxy;
