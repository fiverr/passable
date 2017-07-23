// @flow
import {getSize} from '../../helpers';

const smallerThanOrEquals = (value: mixed, arg1: mixed): boolean => getSize(value) <= getSize(arg1);

export default smallerThanOrEquals;