// @flow
import Passable from './Passable';
import { version } from '../version.json';


function passable(name: string, ...args: PassableArguments) {
    return new Passable(name, ...args);
}
passable.VERSION = version;

export default passable;