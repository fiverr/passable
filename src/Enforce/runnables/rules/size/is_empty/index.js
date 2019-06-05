// @flow
import getSize from '../../../helpers/get_size';

function isEmpty(value: mixed): boolean {
    return Boolean(getSize(value) === 0);
};

isEmpty.negativeForm = 'isNotEmpty';

export default isEmpty;