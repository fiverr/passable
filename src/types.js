// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types
declare type ArrayOrStringOfArrays = Array<string> | string;
declare type NumStrBool = number | string | boolean;
declare type MapType = Map<mixed, mixed>;

// Validate function
declare type ValidityObject = {
    valid: boolean,
    message?: string
};

// Passable
declare type PassableRuntime = {
    specific: SpecificObject,
    tests: TestsWrapper
};

declare type testRunnerCallback = {
    valid: boolean
} | void | null;

// Passable: Specific
declare type SpecificObject = {
    only: Set<string>,
    not: Set<string>
};

declare type Specific = Array<string> | string | {
    only?: ArrayOrStringOfArrays,
    not?: ArrayOrStringOfArrays
};

// Passable: Result Object
declare type ErrorAndWarningObject = {
    [name: string]: Array<string>
};

// Test
declare type TestsWrapper = (test: TestProvider) => void;
declare type TestProvider = (fieldName: string, statemenpt: string, test: TestFn, severity: Severity) => void;
declare type TestFn = () => void;

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

// Enforce: Compound
declare type Runner = (value: AnyValue, tests: CompoundTestObject, rules: EnforceRules) => boolean;
declare type CompoundTestObject = {
    [rule: string]: AnyValue
};