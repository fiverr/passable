import {getSize} from '../../helpers';

const largerThan = (value, arg1) => getSize(value) > getSize(arg1);

export default largerThan;