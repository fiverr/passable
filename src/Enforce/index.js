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

    runSingle(ctx: EnforceProxy, rule: string, value: AnyValue, ...args: AnyValue) {
        if (typeof this.allRules[rule] !== 'function') { return; }
        return single.call(ctx, value, this.allRules[rule], ...args);
    }

    runCompound(ctx: EnforceProxy, value: AnyValue, group: string, tests: CompoundTestObject) {
        return compound.call(ctx, value, group, tests, this.allRules);
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceProxy = new Proxy(this.allRules, {
            get: (allRules, rule) => {
                const ruleUsed: ProxiedRule = allRules[rule];

                if (runners.hasOwnProperty(rule)) {
                    return (tests) => this.runCompound(proxy, value, rule, tests);
                } else if (allRules.hasOwnProperty(rule)) {
                    return (...args) => this.runSingle(proxy, rule, value, ...args);
                } else {
                    return allRules[rule];
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