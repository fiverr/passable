// @flow
import {getSize} from '../../helpers';

function largerThanOrEquals(value: mixed, arg1: number): boolean {
    return getSize(value) >= arg1;
}

export default largerThanOrEquals;