/**
 * Checks that a given argument qualifies as a test function
 * @param {*} testFn
 * @return {Boolean}
 */
const isTestFn = (testFn) => {
    if (!testFn) {
        return false;
    }

    return typeof testFn.then === 'function' || typeof testFn === 'function';
};

export default isTestFn;
