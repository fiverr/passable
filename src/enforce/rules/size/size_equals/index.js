import {getSize} from '../../helpers';

const sizeEquals = (value, arg1) => getSize(value) === getSize(arg1);

export default sizeEquals;