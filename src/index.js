// @flow
import Passable from './Passable';
import enforce from './enforce';
import validate from './validate';
import { version } from '../version.json';

function passable(name: string, ...args: PassableArguments) {
    return new Passable(name, ...args);
}
passable.VERSION = version;
passable.enforce = enforce;
passable.validate = validate;

export default passable;