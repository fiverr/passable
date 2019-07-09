/**
 * Runs given functions and returns true if any of them passes
 * @param  {[]Function} args array of assertion functions
 * @return {Function} A function which, when called, invokes all arguments
 */
const any = (...args) => () => args.some((fn) => {
    try {
        return fn() !== false;
    } catch (err) {
        return false;
    }
});

export default any;
