// @flow
import {getSize} from '../../helpers';

function smallerThanOrEquals(value: mixed, arg1: number) {
    return getSize(value) <= arg1;
}

export default smallerThanOrEquals;