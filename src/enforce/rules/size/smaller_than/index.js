import {getSize} from '../../helpers';

const smallerThan = (value, arg1) => getSize(value) < getSize(arg1);

export default smallerThan;