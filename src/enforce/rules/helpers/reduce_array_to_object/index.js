function reduceArrayToObject(array) {
    return array.reduce((acc, val) => {
        acc[val] = true;
	    return acc;
    }, {});
}

export default reduceArrayToObject;