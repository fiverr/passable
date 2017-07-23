// @flow

import { isType,
    findArrayValuesInArray,
    findValInArrayOrString
} from '../../helpers';

type All = string | number | boolean | Array<mixed>;
type Value = All | Array<All>;
type Arg = string | Array<All>;

function inside(value: Value , arg1: Arg): boolean {

    if (isType(arg1, 'array')) {

        if (isType(value, 'string') || isType(value, 'number') || isType(value, 'boolean')) {
            return findValInArrayOrString(value, arg1);
        } else if (isType(value, 'array')) {
            return findArrayValuesInArray(value, arg1);
        }

    } else if (isType(arg1, 'string')) {
        if (isType(value, 'string')) {
            return findValInArrayOrString(value, arg1);
        }
    }

    return false;
}

export default inside;