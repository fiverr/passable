// @flow

import * as runnables from './runnables';
import * as runners from './runners';

// $FlowFixMe
const glob: GlobalObject = Function('return this')();

const Enforce: Function = (customRules: EnforceRules = {}): EnforceInstance => {
    const rules: EnforceRules = Object.assign({}, runnables.rules, customRules);

    if (typeof glob.Proxy === 'function') {
        return (value: AnyValue): EnforceRules => {
            const proxy: EnforceRules = new Proxy(rules, {
                get: (rules, fnName) => {
                    if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
                        return (...args) => {
                            runners.rule(rules[fnName], value, ...args);
                            return proxy;
                        };
                    }
                    return undefined;
                }
            });
            return proxy;
        };
    }

    const rulesList: string[] = Object.keys(rules);

    return (value) => rulesList.reduce((allRules, fnName) => {
        if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
            allRules[fnName] = (...args) => {
                runners.rule(rules[fnName], value, ...args);
                return allRules;
            };
        }

        return allRules;
    }, {});
};

export default Enforce;