// @flow
import Passable from './Core/Passable';
import Enforce, { enforce } from './Enforce';
import validate from './validate';
import { WARN, FAIL } from './Core/ResultObject';
import { version } from '../version.json';

function passable(name: string, tests: TestsWrapper, specific: ?SpecificArgs) {
    const suite: Passable = new Passable(name, tests, specific);
    return suite.res;
}

passable.VERSION = version;
passable.enforce = enforce;
passable.Enforce = Enforce;
passable.validate = validate;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;