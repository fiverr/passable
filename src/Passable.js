// @flow

import testRunner from './test_runner';
import ResultObject from './result_object';
import { runtimeError } from 'Helpers';
import Specific from './Specific';
import { Errors } from 'Constants';

class Passable {

    specific: Specific;
    res: ResultObject;
    test: TestProvider;

    constructor(name: string, specific: SpecificArgs, tests: TestsWrapper) {

        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }

        this.specific = new Specific(specific);

        if (typeof tests !== 'function') {
            throw runtimeError(Errors.MISSING_ARGUMENT_TESTS, typeof tests);
        }

        this.res = new ResultObject(name);

        tests(this.test);

        return this.res;
    }

    test = (fieldName: string, statement: string, test: TestFn, severity: Severity) => {

        if (this.specific.excludes(fieldName)) {
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