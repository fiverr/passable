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
        const proxy: EnforceProxy = new Proxy(this.boundRules, {
            get: (boundRules, rule) => {
                const ruleUsed: ProxiedRule = boundRules[rule];

                if (runners.hasOwnProperty(rule)) {
                    return (tests) => this.runCompound(proxy, value, rule, tests);
                } else if (boundRules.hasOwnProperty(rule)) {
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