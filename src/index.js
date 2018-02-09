// @flow
import Passable from './Passable';
import enforce from './enforce';
import validate from './validate';
import { version } from '../version.json';

function passable(name: string, specific: Specific, tests: TestsWrapper, custom?: Rules) {
    return new Passable(name, specific, tests, custom);
}
passable.VERSION = version;
passable.enforce = enforce;
passable.validate = validate;

export default passable;