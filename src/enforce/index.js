// @flow
import rules from './rules';
import runners from './runners';

function isUntested(valid) {
    return valid === null;
}

function isInvalid(valid) {
    return !isUntested(valid) && valid === false;
}

function enforce(value: mixed, custom: Rules = {}) {
    const allRules: Rules = Object.assign({}, rules, custom),
        self: EnforceSelf = {
            anyOf: (tests: Tests) => run('anyOf', tests),
            allOf: (tests: Tests) => run('allOf', tests),
            noneOf: (tests: Tests) => run('noneOf', tests),
            fin
        };

    function run(group, tests) {
        if (isInvalid(self.valid)) {
            return self;
        }

        self.valid = runners[group](value, tests, allRules);

        if (self.valid !== true) {
            throw new Error(`${group} - ${value} - invalid`);
        }

        return self;
    }

    function fin() {
        return !!self.valid;
    }

    return self;
}

export default enforce;