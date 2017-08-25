// @flow

function reduceArrayToObject(array: Array<string | number>): ArrayReducedToObject {
    return array.reduce((acc, val) => {
        acc[val] = true;
	    return acc;
    }, {});
}

export default reduceArrayToObject;