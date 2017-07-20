import {getSize} from '../../helpers';

const largerThanOrEquals = (value, arg1) => getSize(value) >= getSize(arg1);

export default largerThanOrEquals;