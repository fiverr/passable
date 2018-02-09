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

declare type EnforceSelf = {
    [testRunner: string]: Function,
    fin: Function,
    valid?: boolean
};

declare type Severity = 'warn' | 'fail';
declare type Enforce = (AnyValue, Rules) => EnforceSelf;
declare type TestsWrapper = (test: TestProvider, enforce: Enforce) => void;
declare type TestProvider = (fieldName: string, statemenpt: string, ...args: [Severity, TestFn]) => void;
declare type TestFn = () => void;

declare type PassableRuntime = {
    specific: SpecificObject,
    tests: TestsWrapper,
    custom: Rules
};

declare type ValidityObject = {
    valid: boolean,
    message?: string
};

declare type SpecificObject = {
    only: Set<string>,
    not: Set<string>
};