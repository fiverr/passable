// @flow
import {getSize} from '../../helpers';

const largerThan = (value: mixed, arg1: mixed): boolean => getSize(value) > getSize(arg1);

export default largerThan;