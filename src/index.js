// @flow
import Passable from './Passable';
import enforce from './enforce';
import validate from './validate';
import { version } from '../version.json';

function passable(name: string, specific: Specific, passes: Passes, custom?: Rules) {
    return new Passable(name, specific, passes, custom);
}
passable.VERSION = version;
passable.enforce = enforce;
passable.validate = validate;

export default passable;