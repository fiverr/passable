// @flow
import getSize from '../../../helpers/get_size';

function largerThan(value: mixed, arg1: number): boolean {
    return getSize(value) > arg1;
}

export default largerThan;