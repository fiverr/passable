// @flow
import getSize from '../../../helpers/get_size';

function smallerThan(value: mixed, arg1: number) {
    return getSize(value) < arg1;
}

export default smallerThan;