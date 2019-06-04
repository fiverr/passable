// @flow

import isNumeric from '../../rules/content/is_numeric/';

function getSize(value: AnyValue): number {

    if (!value) {
        return 0;
    } else if (isNumeric(value)) {
        return value;
    } else if (value.hasOwnProperty('length')) {
        return value.length;
    } else if (typeof value === 'object') {
        return Object.keys(value).length;
    } else {
        return 0;
    }
};

export default getSize;