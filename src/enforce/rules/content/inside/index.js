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

        if ((isType(value, 'string') || isType(value, 'number') || isType(value, 'boolean'))) {
            return findValInArrayOrString(value, arg1);
        } else if (Array.isArray(value)) {
            return findArrayValuesInArray(value, arg1);
        }

    }

    if (isType(arg1, 'string')) {
        if (isType(value, 'string')) {
            return findValInArrayOrString(value, arg1);
        }
    }

    return false;
}

export default inside;