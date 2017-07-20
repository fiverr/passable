import {getSize} from '../../helpers';

const smallerThanOrEquals = (value, arg1) => getSize(value) <= getSize(arg1);

export default smallerThanOrEquals;