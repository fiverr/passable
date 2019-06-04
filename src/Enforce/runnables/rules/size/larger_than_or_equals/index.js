// @flow
import getSize from '../../../helpers/get_size';

function largerThanOrEquals(value: mixed, arg1: number): boolean {
    return getSize(value) >= arg1;
}

export default largerThanOrEquals;