const getSize = (value) => {

    if (!value) {
        return 0;
    } else if (typeof value === 'number' && !isNaN(value)) {
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