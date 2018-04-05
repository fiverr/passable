// @flow
import { getSize } from '../../helpers';

function sizeEquals(value: mixed, arg1: number) {
    return getSize(value) === arg1;
}

sizeEquals.negativeForm = 'sizeNotEquals';

export default sizeEquals;