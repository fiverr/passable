import isNumeric from '../is_numeric';

function isEmpty(value) {
    if (!value) {
        return true;
    } else if (isNumeric(value)) {
        return value === 0;
    } else if (value.hasOwnProperty('length')) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    } else {
        return true;
    }
}

isEmpty.negativeForm = 'isNotEmpty';

export default isEmpty;
