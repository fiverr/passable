// @flow

declare type Rules = {
    [name: string]: Function
};

declare type Severity = 'warn' | 'fail';

declare type PassableArguments = Array<string | Array<string> | Object | Function>;

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