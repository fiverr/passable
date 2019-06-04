// @flow
import getSize from '../../../helpers/get_size';

function smallerThanOrEquals(value: mixed, arg1: number) {
    return getSize(value) <= arg1;
}

export default smallerThanOrEquals;