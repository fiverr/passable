// @flow

import ctx from '../context';
import test, { runAsync } from '../test';
import passableResult from '../passableResult';
import Specific from '../Specific';

const initError: Function = (name: string, value: string, doc?: string): string => `[Passable]: failed during suite initialization. Unexpected '${typeof value}' for '${name}' argument.
    See: ${doc ? doc : 'https://fiverr.github.io/passable/getting_started/writing_tests.html'}`;

const passable: Function = (name, tests, specific) => {

    if (typeof name !== 'string') {
        throw new TypeError(initError('suite name', name));
    }

    if (typeof tests !== 'function') {
        throw new TypeError(initError('tests', tests));
    }

    if (specific && !Specific.is(specific)) {
        throw new TypeError(initError('specific', tests, 'https://fiverr.github.io/passable/test/specific.html'));
    }

    const result: PassableResult = passableResult(name);

    const pending: Pending = [];

    const parent: ParentContext = {
        specific: new Specific(specific),
        result,
        pending
    };

    ctx.set(parent);

    tests(test, result.output);
    ctx.set(null);

    [...pending].forEach(runAsync);

    return result.output;
};


export default passable;