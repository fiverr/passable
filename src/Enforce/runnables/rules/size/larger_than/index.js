// @flow
import { getSize } from '../../helpers';

function largerThan(value: mixed, arg1: number): boolean {
    return getSize(value) > arg1;
}

export default largerThan;