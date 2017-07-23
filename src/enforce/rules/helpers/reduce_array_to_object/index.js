// @flow

function reduceArrayToObject(array: Array<string | number>): Object {
    return array.reduce((acc, val) => {
        acc[val] = true;
	    return acc;
    }, {});
}

export default reduceArrayToObject;