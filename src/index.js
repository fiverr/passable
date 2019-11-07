import enforce from 'n4s/dist/enforce.min';
import any from 'anyone/any';
import passable from './core/passable';
import Context from './core/Context';
import draft from './core/draft';
import test from './core/test';
import validate from './utilities/validate';
import singleton from './lib/singleton';
import { WARN, FAIL, VERSION } from './constants';

passable.VERSION = VERSION;
passable.enforce = enforce;
passable.draft = draft;
passable.Enforce = enforce.Enforce;
passable.test = test;
passable.validate = validate;
passable.any = any;
passable.WARN = WARN;
passable.FAIL = FAIL;

singleton.register(passable, Context);

export default passable;
