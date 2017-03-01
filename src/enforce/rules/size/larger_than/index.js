import {getSize} from '../../helpers';

const largerThan = (value, { testAgainst }) => getSize(value) > getSize(testAgainst);

export default largerThan;