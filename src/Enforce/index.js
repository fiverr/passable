// @flow

import * as runnables from './runnables';
import * as runners from './runners';

class Enforce {
    enforce: EnforceInstance;
    rules: EnforceRules;

    constructor(customRules: EnforceRules = {}) {
        this.rules = Object.assign({}, runnables.rules, customRules);

        return this.enforce;
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceRules = new Proxy(this.rules, {
            get: (rules, fnName) => {

                if (rules.hasOwnProperty(fnName)) {
                    return (...args) => {
                        runners.rule(rules[fnName], value, ...args);
                        return proxy;
                    };
                } else if (runnables.compounds.hasOwnProperty(fnName)) {
                    return (tests) => {
                        runners.compound(rules, runnables.compounds[fnName], value, tests);
                        return proxy;
                    };
                } else {
                    return rules[fnName];
                }
            }
        });
        return proxy;
    }
}

const enforce: EnforceInstance = new Enforce({});

export default Enforce;

export {
    enforce
};
