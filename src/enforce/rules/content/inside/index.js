// @flow

import {
    isType,
    findArrayValuesInArray,
    findValInArrayOrString
} from '../../helpers';

type All = NumStrBool | Array<NumStrBool>;
type Value = All | Array<NumStrBool>;
type Arg = string | Array<NumStrBool>;

function inside(value: Value, arg1: Arg): boolean {

    if (Array.isArray(arg1)) {

        if (isType(value, 'string', 'number', 'boolean')) {
            return findValInArrayOrString(value, arg1);
        }
        if (Array.isArray(value)) {
            return findArrayValuesInArray(value, arg1);
        }

    }

    // both value and arg1 are strings
    if (isType(arg1, 'string') && isType(value, 'string')) {
        return findValInArrayOrString(value, arg1);
    }

    return false;
}

export default inside;