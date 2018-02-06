// @flow

function reduceArrayToMap(array: Array<NumStrBool>): MapType {
    return array.reduce((acc, val) => {
        acc.set(val, true);
	    return acc;
    }, new Map());
}

export default reduceArrayToMap;