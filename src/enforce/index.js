import rules from './rules';
import runners from './runners';

function isUntested(valid) {
    return valid === null;
}

function isInvalid(valid) {
    return !isUntested(valid) && valid === false;
}

function enforce(value, custom) {
    const self = this || {};
    custom = custom || {};

    const registered = Object.assign({}, rules, custom);

    self.anyOf = (tests) => run('anyOf', tests);
    self.allOf = (tests) => run('allOf', tests);
    self.noneOf = (tests) => run('noneOf', tests);
    self.fin = fin;

    function run(group, tests) {
        if (isInvalid(self.valid)) {
            return self;
        }

        self.valid = runners[group](value, tests, registered);
        return self;
    }

    function fin() {
        return self.valid;
    }

    return self;
}

export default enforce;