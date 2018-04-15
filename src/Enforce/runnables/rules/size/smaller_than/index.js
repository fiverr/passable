// @flow
import {getSize} from '../../helpers';

function smallerThan(value: mixed, arg1: number) {
    return getSize(value) < arg1;
}

export default smallerThan;