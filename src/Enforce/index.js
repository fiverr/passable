// @flow

import * as runnables from './runnables';
import * as runners from './runners';
import safeProxy from './helpers/safe_proxy';

const Enforce: Function = (customRules: EnforceRules = {}): EnforceInstance => {
    const rules: EnforceRules = Object.assign({}, runnables.rules, customRules);

    const enforce: Function = (value: AnyValue): EnforceRules => {
        const proxy: EnforceRules = safeProxy(rules, {
            get: (rules, fnName) => {

                if (rules.hasOwnProperty(fnName) && typeof rules[fnName] === 'function') {
                    return (...args) => {
                        runners.rule(rules[fnName], value, ...args);
                        return proxy;
                    };
                }

                return rules[fnName];
            }
        });
        return proxy;
    };

    return enforce;
};

export default Enforce;