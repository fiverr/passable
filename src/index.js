// @flow
import Passable from './Passable';
import Enforce, { enforce } from './Enforce';
import validate from './validate';
import { WARN, FAIL } from './result_object';
import { version } from '../version.json';

function passable(name: string, specific: SpecificArgs, tests: TestsWrapper) {
    return new Passable(name, specific, tests);
}

passable.VERSION = version;
passable.enforce = enforce;
passable.Enforce = Enforce;
passable.validate = validate;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;