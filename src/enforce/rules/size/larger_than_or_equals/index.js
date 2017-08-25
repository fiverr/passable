// @flow
import {getSize} from '../../helpers';

const largerThanOrEquals: Function = (value: mixed, arg1: mixed): boolean => getSize(value) >= getSize(arg1);

export default largerThanOrEquals;