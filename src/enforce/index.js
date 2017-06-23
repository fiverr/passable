import rules from './rules';
import runners from './runners';

function enforce(value, custom) {
    custom = custom || {};

    const registered = Object.assign({}, rules, custom);
    let valid = null;

   function isUntested() {
        return valid === null;
    }

    function isInvalid() {
        return !isUntested() && valid === false;
    }

    function allOf(tests) {
        if (isInvalid()) {
            return this;
        }
        valid = runners.allOf(value, tests, registered);
        return this;
    }

    function anyOf(tests) {
        if (isInvalid()) {
            return this;
        }
        valid = runners.anyOf(value, tests, registered);
        return this;
    }

    function noneOf(tests) {
        if (isInvalid()) {
            return this;
        }
        valid = runners.noneOf(value, tests, registered);
        return this;
    }

    function fin() {
        return valid;
    }

    return { allOf, anyOf, noneOf, fin };
}

export default enforce;