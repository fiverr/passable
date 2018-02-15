// @flow

import baseRules from './rules';
import runners from './runners';
import { compound, single } from './chainables';

class Enforce {
    enforce: EnforceInstance;
    rules: EnforceRules;

    constructor(customRules: EnforceRules = {}) {
        this.rules = Object.assign({}, baseRules, customRules);

        return this.enforce;
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceRules = new Proxy(this.rules, {
            get: (rules, fnName) => {

                if (rules.hasOwnProperty(fnName)) {
                    return (...args) => {
                        single(rules[fnName], value, ...args);
                        return proxy;
                    };
                } else if (runners.hasOwnProperty(fnName)) {
                    return (tests) => {
                        compound(rules, runners[fnName], value, tests);
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