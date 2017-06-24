import rules from './rules';
import runners from './runners';

function enforce(value, custom) {
    const self = this || {};
    custom = custom || {};

    const registered = Object.assign({}, rules, custom);

    self.anyOf = anyOf;
    self.allOf = allOf;
    self.noneOf = noneOf;
    self.fin = fin;

    function isUntested() {
        return self.valid === null;
    }

    function isInvalid() {
        return !isUntested() && self.valid === false;
    }

    function allOf(tests) {
        if (isInvalid()) {
            return self;
        }
        self.valid = runners.allOf(value, tests, registered);
        return self;
    }

    function anyOf(tests) {
        if (isInvalid()) {
            return self;
        }
        self.valid = runners.anyOf(value, tests, registered);
        return self;
    }

    function noneOf(tests) {
        if (isInvalid()) {
            return self;
        }
        self.valid = runners.noneOf(value, tests, registered);
        return self;
    }

    function fin() {
        return self.valid;
    }

    return self;
}

export default enforce;