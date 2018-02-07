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

        this.boundRules = {};

        Object.keys(runners).forEach((group: string) => {
            this.boundRules[group] = function(value: AnyValue, tests: CompoundTestObject) {
                return compound.call(this, value, group, tests, allRules);
            };
        });

        return this.enforce;
    }

    runSingle(ctx: EnforceProxy, rule: string, value: AnyValue, ...args: AnyValue) {
        if (typeof this.allRules[rule] !== 'function') { return; }
        return single.call(ctx, value, this.allRules[rule], ...args);
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceProxy = new Proxy(this.boundRules, {
            get: (boundRules, rule) => {
                const ruleUsed: ProxiedRule = boundRules[rule];
                if (boundRules.hasOwnProperty(rule)) {
                    return (...args) => ruleUsed.call(proxy, value, ...args);
                } else if (this.allRules.hasOwnProperty(rule)) {
                    return (...args) => this.runSingle(proxy, rule, value, ...args);
                } else {
                    return boundRules[rule];
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