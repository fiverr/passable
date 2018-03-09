// @flow
import { getSize } from '../../helpers';

function sizeEquals(value: mixed, arg1: mixed) {
    return getSize(value) === getSize(arg1);
}

sizeEquals.negativeForm = 'sizeNotEquals';

export default sizeEquals;