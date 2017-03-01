import {getSize} from '../../helpers';

const smallerThan = (value, { testAgainst }) => getSize(value) === getSize(testAgainst);

export default smallerThan;