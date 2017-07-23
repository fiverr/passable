// @flow
import {getSize} from '../../helpers';

const sizeEquals = (value: mixed, arg1: mixed): boolean => getSize(value) === getSize(arg1);

export default sizeEquals;