// @flow

import enforce from './enforce';
import testRunner from './test_runner';
import ResultObject from './result_object';
import { passableArgs, root, runtimeError, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

const FAIL: Severity = 'fail';

class Passable {

    specific: SpecificObject;
    custom: Rules;
    res: ResultObject;
    test: TestProvider;

    constructor(name: string, specific: Specific, tests: TestsWrapper, custom?: Rules) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(specific, tests, custom),
            globalRules: Rules = root.customPassableRules || {};

        this.specific = computedArgs.specific;
        this.custom = Object.assign({}, globalRules, computedArgs.custom);
        this.res = new ResultObject(name);

        computedArgs.tests(this.test, (value) => enforce(value, this.custom));

        return this.res;
    }

    test = (fieldName: string, statement: string, ...args: [Severity, TestFn]) => {
        const { only, not }: { [filter: string]: Set<string>} = this.specific;
        const notInOnly: boolean = only.size > 0 && !only.has(fieldName);

        if (notInOnly || not.has(fieldName)) {
            this.res.addToSkipped(fieldName);
            return;
        }

        const lastIndex: number = args.length - 1;
        let callback: Function;

        if (typeof args[lastIndex] === 'function') {
            callback = args[lastIndex];
        } else {
            return;
        }

        this.res.initFieldCounters(fieldName);

        const isValid: boolean = testRunner(callback);

        if (!isValid) {
            const severity: Severity = lastIndex !== 0 ? args[0] : FAIL;
            this.res.fail(fieldName, statement, severity);
        }

        this.res.bumpTestCounter(fieldName);
    }
}

export default Passable;