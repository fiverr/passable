// @flow
import Passable from './core/Passable';
import Enforce from './Enforce';
import validate from './validate';
import { WARN, FAIL } from './constants';

function passable(name: string, tests: TestsWrapper, specific: ?SpecificArgs) {
    const suite: Passable = new Passable(name, tests, specific);
    return suite.res.output;
}

passable.VERSION = PASSABLE_VERSION;
passable.enforce = new Enforce({});
passable.Enforce = Enforce;
passable.validate = validate;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;