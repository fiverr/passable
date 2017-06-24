import enforce from './enforce';
import passRun from './passRun';
import { passableArgs } from './helpers';

const WARN = 'warn',
    FAIL = 'fail';

/**
 * Runs a group of validation tests
 *
 * @param  {String}   name   - A name for the group of tests which is being run
 * @param  {Array}    specific - (optional) An array of names specific passes you wish to run. If passed, others will be excluded.
 * @param  {function} passes - A function that contains the validation logic
 * @param  {Object}   custom - (optional) Custom rules, extensions for the predefined rules
 * @return validation result
 *
 */
function Passable(name, ...args) {

    const {
        specific, passes, custom
    } = passableArgs(args);

    let currentPass;

    let hasValidationErrors = false,
        hasValidationWarnings = false,
        failCount = 0,
        warnCount = 0,
        testCount = 0;

    const testsPerformed = {},
        validationErrors = {},
        validationWarnings = {},
        skipped = [];

    /**
     * Runs a single test within the validation process
     *
     * @param  {String}   dataName  - A name for the test (unit) which is being run
     * @param  {String}   statement - A description for the test which is being run
     * @param  {String}   severity  - (optional) warn instead of fail (expects 'warn')
     * @param  {Function} callback  - The specific test's validation logic
     * @return {Boolean}  whether the unit is valid or not
     *
     * @example pass('UserName', 'Must be longer than 5 chars', () => {...});
     */
    function pass(dataName, statement, ...args) {

        if (specific.length && specific.indexOf(dataName) === -1) {
            skipped.push(dataName);
            return;
        }

        let severity = FAIL;

        // callback is always the last argument
        const callback = args.slice(-1)[0];
        currentPass = passRun();
        const isValid = currentPass.run(callback);

        if (typeof args[0] === 'string') {
            // warn rather than fail
            severity = args[0] === WARN ? WARN : FAIL;
        }

        if (!testsPerformed.hasOwnProperty(dataName)) {
            testsPerformed[dataName] = {
                testCount: 0,
                failCount: 0,
                warnCount: 0
            };
        }

        if (!isValid) {
            // on failure/error, bump up the counters
            severity === FAIL ? onError(dataName, statement) : onWarn(dataName, statement);
        }

        // bump overall counters
        testsPerformed[dataName].testCount++;
        testCount++;

        return isValid;
    };

    function onError(dataName, statement) {
        hasValidationErrors = true;
        validationErrors[dataName] = validationErrors[dataName] || [];
        validationErrors[dataName].push(statement);
        failCount++;
        testsPerformed[dataName].failCount++;
    }

    function onWarn(dataName, statement) {
        hasValidationWarnings = true;
        validationWarnings[dataName] = validationWarnings[dataName] || [];
        validationWarnings[dataName].push(statement);
        warnCount++;
        testsPerformed[dataName].warnCount++;
    }

    function generateResultObject() {
        const result = {
            name,
            hasValidationErrors,
            hasValidationWarnings,
            testsPerformed,
            validationErrors,
            validationWarnings,
            failCount,
            warnCount,
            testCount,
            skipped
        };

        return result;
    }

    if (typeof passes === 'function') {
        // register all the tests
        const Enforce = (value) => {
            const e = enforce.bind(currentPass);
            return e(value, custom);
        };

        // run all units in the group
        passes(pass, Enforce);
    }

    return generateResultObject();
}

export default Passable;