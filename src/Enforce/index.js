// @flow

import * as runnables from './runnables';
import * as runners from './runners';
import safeProxy from './helpers/safe_proxy';

const Enforce: Function = (customRules: EnforceRules = {}): EnforceInstance => {
    const rules: EnforceRules = Object.assign({}, runnables.rules, customRules);
    const allRunnables: EnforceRules = Object.assign({}, runnables.compounds, rules);

    const enforce: Function = (value: AnyValue): EnforceRules => {
        const proxy: EnforceRules = safeProxy(allRunnables, {
            get: (allRunnables, fnName) => {

                if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
                    return (...args) => {
                        runners.rule(rules[fnName], value, ...args);
                        return proxy;
                    };
                } else if (runnables.compounds.hasOwnProperty(fnName) && typeof runnables.compounds[fnName] === 'function') {
                    return (tests) => {
                        runners.compound(rules, runnables.compounds[fnName], value, tests);
                        return proxy;
                    };
                } else {
                    return allRunnables[fnName];
                }
            }
        });
        return proxy;
    };

    return enforce;
};

export default Enforce;