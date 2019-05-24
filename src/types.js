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
declare type testRunnerCallback = {
    valid: boolean
} | void | null;

// Passable: Specific
declare type SpecificGroup = {
    [name: string]: boolean
};

declare type SpecificObject = {
    only?: SpecificGroup,
    not?: SpecificGroup
};

declare type SpecificField = Array<string> | string;
declare type SpecificArgs = void | SpecificField | {
    only: SpecificField,
    not: SpecificField
};

// Passable: Result Object
declare type ErrorAndWarningObject = {
    [name: string]: Array<string>
}

declare type AsyncObject = {
    [name: string]: {
        done: boolean,
        callbacks?: Array<Function>
    }
} | null;

// Test
declare type TestsWrapper = (test: TestProvider, draft: resultObject) => void;
declare type TestProvider = (fieldName: string, statemenpt: string, test: PassableTest, severity: Severity) => void;
declare type PassableTest = () => void | () => boolean | Promise<void>;

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
}

declare type NumericValue = number | string;

declare var PASSABLE_VERSION: string;

declare type StringOrArray = string | RuleArgs;

declare type Output = {
    name: String,

}

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
};
