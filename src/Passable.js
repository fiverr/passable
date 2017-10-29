// @flow

import enforce from './enforce';
import passRunner from './pass_runner';
import { passableArgs, initResponseObject, initField, onFail, root, runtimeError } from 'Helpers';
import { Errors } from 'Constants';

const FAIL: Severity = 'fail';

class Passable {

    specific: Array<string> | string;
    custom: Rules;
    res: PassableResponse;
    pass: Function;
    enforce: Function;

    constructor(name: string, ...args) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(args),
            globalRules: Rules = root.customPassableRules || {};

        this.specific = computedArgs.specific;
        this.custom = Object.assign({}, globalRules, computedArgs.custom);
        this.res = initResponseObject(name);
        this.pass = this.pass.bind(this);
        this.enforce = this.enforce.bind(this);

        computedArgs.passes(this.pass, this.enforce);

        return this.res;
    }

    pass(fieldName: string, statement: string, ...args: Array<Severity | Pass>) {

        if (this.specific.length && this.specific.indexOf(fieldName) === -1) {
            this.res.skipped.push(fieldName);
            return;
        }

        this.res.testsPerformed[fieldName] = this.res.testsPerformed[fieldName] || initField();

        // callback is always the last argument -- $FlowFixMe (we DO know it is a function)
        const callback: Function = args.pop(),
            isValid: boolean = passRunner(callback);

        if (!isValid) { // $FlowFixMe (we DO know it is a string)
            const severity: Severity = args[0] || FAIL;

            // on failure/error, bump up the counters
            this.res = onFail(fieldName, statement, severity, this.res);
        }

        this.bumpCounters(fieldName);
        return isValid;
    }

    enforce(value: AnyValue) {
        return enforce(value, this.custom);
    }

    bumpCounters(fieldName: string) {
        // bump overall counters
        this.res.testsPerformed[fieldName].testCount++;
        this.res.testCount++;
    }
}

const passable: Function = (name: string, ...args: PassableArguments) => new Passable(name, ...args);

export default passable;
