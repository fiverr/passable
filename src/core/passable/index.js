import Context from '../Context';
import test, { runAsync } from '../test';
import passableResult from '../passableResult';
import Specific from '../Specific';

const initError = (name, value, doc) => `[Passable]: failed during suite initialization. Unexpected '${typeof value}' for '${name}' argument.
    See: ${doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html'}`;

const passable = (name, tests, specific) => {

    if (typeof name !== 'string') {
        throw new TypeError(initError('suite name', name));
    }

    if (typeof tests !== 'function') {
        throw new TypeError(initError('tests', tests));
    }

    if (specific && !Specific.is(specific)) {
        throw new TypeError(initError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
    }

    const result = passableResult(name);

    const pending = [];

    new Context({
        specific: new Specific(specific),
        result,
        pending
    });

    tests(test, result.output);

    Context.clear();

    [...pending].forEach(runAsync);

    return result.output;
};

export default passable;
