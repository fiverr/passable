// @flow

import testRunner from './test_runner';
import ResultObject from './result_object';
import { passableArgs, runtimeError, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

class Passable {

    specific: SpecificObject;
    res: ResultObject;
    test: TestProvider;

    constructor(name: string, specific: Specific, tests: TestsWrapper) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(specific, tests);

        this.specific = computedArgs.specific;
        this.res = new ResultObject(name);

        computedArgs.tests(this.test);

        return this.res;
    }

    test = (fieldName: string, statement: string, test: TestFn, severity: Severity) => {
        const { only, not }: SpecificObject = this.specific;
        const notInOnly: boolean | void = only && !only[fieldName];

        if (notInOnly || (not && not[fieldName])) {
            this.res.addToSkipped(fieldName);
            return;
        }

        this.res.initFieldCounters(fieldName);

        if (typeof test !== 'function') {
            return;
        }

        const isValid: boolean = testRunner(test);

        if (!isValid) {
            this.res.fail(fieldName, statement, severity);
        }

        this.res.bumpTestCounter(fieldName);
    }
}

export default Passable;