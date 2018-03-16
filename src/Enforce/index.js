// @flow

import * as runnables from './runnables';
import * as runners from './runners';
import safeProxy from './helpers/safe_proxy';

class Enforce {
    enforce: EnforceInstance;
    rules: EnforceRules;
    allRunnables: EnforceRules;

    constructor(customRules: EnforceRules = {}) {
        this.rules = Object.assign({}, runnables.rules, customRules);
        this.allRunnables = Object.assign({}, runnables.compounds, this.rules);

        return this.enforce;
    }

    enforce = (value: AnyValue) => {
        const proxy: EnforceRules = safeProxy(this.allRunnables, {
            get: (allRunnables, fnName) => {

                if (this.rules.hasOwnProperty(fnName) && typeof this.rules[fnName] === 'function') {
                    return (...args) => {
                        runners.rule(this.rules[fnName], value, ...args);
                        return proxy;
                    };
                } else if (runnables.compounds.hasOwnProperty(fnName) && typeof runnables.compounds[fnName] === 'function') {
                    return (tests) => {
                        runners.compound(this.rules, runnables.compounds[fnName], value, tests);
                        return proxy;
                    };
                } else {
                    return allRunnables[fnName];
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
