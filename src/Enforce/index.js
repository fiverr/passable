import rules from './runnables';
import ruleRunner from './runners/rule';

const isRule = (rulesObject, name) => (
    rulesObject.hasOwnProperty(name) && typeof rulesObject[name] === 'function'
);

const Enforce = (customRules = {}) => {
    const rulesObject = {...rules, ...customRules};

    if (typeof Proxy === 'function') {
        return (value) => {
            const proxy = new Proxy(rulesObject, {
                get: (rules, fnName) => {
                    if (!isRule(rules, fnName)) { return; }

                    return (...args) => {
                        ruleRunner(rules[fnName], value, ...args);
                        return proxy;
                    };
                }
            });
            return proxy;
        };
    }

    // This is relatively heavier, and preferably should only be done when lacking proxy support
    return (value) => Object.keys(rulesObject).reduce((allRules, fnName) => {
        if (!isRule(rulesObject, fnName)) { return allRules; }

        allRules[fnName] = (...args) => {
            ruleRunner(rulesObject[fnName], value, ...args);
            return allRules;
        };

        return allRules;
    }, {});
};

export default Enforce;
