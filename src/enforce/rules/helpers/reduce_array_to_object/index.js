// @flow

function reduceArrayToObject(array: Array<NUMSTRBOOL>): ArrayReducedToObject {
    return array.reduce((acc, val) => { // $FlowFixMe // https://github.com/facebook/flow/issues/3258
        acc[val] = true;
	    return acc;
    }, {});
}

export default reduceArrayToObject;