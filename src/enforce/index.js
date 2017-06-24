import rules from './rules';
import runners from './runners';

class Enforce {
    constructor(value, custom) {
        this.value = value;
        this.custom = custom || {};
        this.registeredRules = Object.assign({}, rules, custom);
        this.valid = null;
        return this;
    }

    isUntested() {
        return this.valid === null;
    }

    isInvalid() {
        return !this.isUntested() && this.valid === false;
    }

    allOf(tests) {
        if (this.isInvalid()) {
            return this;
        }
        this.valid = runners.allOf(this.value, tests, this.registeredRules);
        return this;
    }

    anyOf(tests) {
        if (this.isInvalid()) {
            return this;
        }
        this.valid = runners.anyOf(this.value, tests, this.registeredRules);
        return this;
    }

    noneOf(tests) {
        if (this.isInvalid()) {
            return this;
        }
        this.valid = runners.noneOf(this.value, tests, this.registeredRules);
        return this;
    }

    fin() {
        return this.valid;
    }

}

const enforce = (value, custom) => new Enforce(value, custom);

export default enforce;