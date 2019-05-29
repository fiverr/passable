// @flow

import rules from './runnables/rules';
import ruleRunner from './runners/rule';

// $FlowFixMe
const glob: GlobalObject = Function('return this')();

const Enforce: Function = (customRules: EnforceRules = {}): EnforceInstance => {
    const rulesObject: EnforceRules = Object.assign({}, rules, customRules);

    if (typeof glob.Proxy === 'function') {
        return (value: AnyValue): EnforceRules => {
            const proxy: EnforceRules = new Proxy(rulesObject, {
                get: (rules, fnName) => {
                    if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
                        return (...args) => {
                            ruleRunner(rules[fnName], value, ...args);
                            return proxy;
                        };
                    }
                    return undefined;
                }
            });
            return proxy;
        };
    }

    const rulesList: string[] = Object.keys(rulesObject);

    return (value) => rulesList.reduce((allRules, fnName) => {
        if (rulesObject.hasOwnProperty(fnName) && typeof rulesObject[fnName] === 'function') {
            allRules[fnName] = (...args) => {
                ruleRunner(rulesObject[fnName], value, ...args);
                return allRules;
            };
        }

        return allRules;
    }, {});
};

export default Enforce;