// @flow

import rules from './rules';
import runners from './runners';
import { compound, single } from './chainables';

class Enforce {
    boundRules: EnforceProxy;
    enforce: EnforceFunc;
    allRules: EnforceRules;

    constructor(custom: EnforceRules = {}) {

        const allRules: EnforceRules = Object.assign({}, rules, custom);
        this.allRules = allRules;

        return this.enforce;
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceProxy = new Proxy(this.allRules, {
            get: (allRules, fnName) => {

                if (runners.hasOwnProperty(fnName)) {
                    return (tests) => {
                        compound(allRules, runners[fnName], value, tests);
                        return proxy;
                    };
                } else if (allRules.hasOwnProperty(fnName)) {
                    return (...args) => {
                        single(allRules[fnName], value, ...args);
                        return proxy;
                    };
                } else {
                    return allRules[fnName];
                }
            }
        });
        return proxy;
    }
}

const enforce: EnforceFunc = new Enforce({});

export default Enforce;

export {
    enforce
};