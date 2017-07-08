import enforce from './enforce';
import passRunner from './pass_runner';
import { passableArgs, initResponseObject, initField, onFail } from './helpers';
import root from 'window-or-global';

const FAIL = 'fail';

class Passable {

    constructor(name, ...args) {
        const computedArgs = passableArgs(args),
            globalRules = root.customPassableRules || {};

        this.specific = computedArgs.specific;
        this.custom = Object.assign({}, globalRules, computedArgs.custom);
        this.res = initResponseObject(name);
        this.pass = this.pass.bind(this);
        this.enforce = this.enforce.bind(this);

        if (typeof computedArgs.passes === 'function') {
            computedArgs.passes(this.pass, this.enforce);
        }

        return this.res;
    }

    pass(fieldName, statement, ...args) {

        if (this.specific.length && this.specific.indexOf(fieldName) === -1) {
            this.res.skipped.push(fieldName);
            return;
        }

        this.res.testsPerformed[fieldName] = this.res.testsPerformed[fieldName] || initField();

        // callback is always the last argument
        const callback = args.pop(),
            isValid = passRunner(callback);

        if (!isValid) {
            const severity = args[0] || FAIL;

            // on failure/error, bump up the counters
            this.res = onFail(fieldName, statement, severity, this.res);
        }

        this.bumpCounters(fieldName);
        return isValid;
    }

    enforce(value) {
        return enforce(value, this.custom);
    }

    bumpCounters(fieldName) {
        // bump overall counters
        this.res.testsPerformed[fieldName].testCount++;
        this.res.testCount++;
    }
}

const passable = (name, ...args) => new Passable(name, ...args);

export default passable;