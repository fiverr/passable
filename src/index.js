// @flow
import Passable from './Passable';
import enforce from './enforce';
import { version } from '../version.json';

function passable(name: string, ...args: PassableArguments) {
    return new Passable(name, ...args);
}
passable.VERSION = version;
passable.enforce = enforce;

export default passable;