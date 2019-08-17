import passable from './core/passable';
import test from './core/test';
import validate from './utilities/validate';
import any from './utilities/any';
import { WARN, FAIL } from './constants';
import enforce from 'n4s/dist/enforce.min';

passable.VERSION = PASSABLE_VERSION;
passable.enforce = enforce;
passable.Enforce = enforce.Enforce;
passable.test = test;
passable.validate = validate;
passable.any = any;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;
