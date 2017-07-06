import { isType,
    findArrayValuesInArray,
    findValInArrayOrString
} from '../../helpers';

function inside(value, arg1) {

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