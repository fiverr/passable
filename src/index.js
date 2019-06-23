// @flow
import passable from './core/passable';
import test from './core/test';
import Enforce from './Enforce';
import validate from './validate';
import { WARN, FAIL } from './constants';

passable.VERSION = PASSABLE_VERSION;
passable.enforce = new Enforce({});
passable.test = test;
passable.Enforce = Enforce;
passable.validate = validate;
passable.WARN = WARN;
passable.FAIL = FAIL;

export default passable;