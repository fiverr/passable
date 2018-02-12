// @flow
import Passable from './Passable';
import enforce from './enforce';
import validate from './validate';
import { WARN, FAIL } from './result_object';
import { version } from '../version.json';

function passable(name: string, specific: Specific, tests: TestsWrapper, custom?: Rules) {
    return new Passable(name, specific, tests, custom);
}
passable.VERSION = version;
passable.enforce = enforce;
passable.validate = validate;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;