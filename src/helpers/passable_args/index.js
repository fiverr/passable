// @flow

/**
 * The function which runs the validation tests.
 *
 * @callback passableCallback
 * @param {function} pass
 * @param {function} enforce
 */

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * passes - The function which runs the validations
 * custom - custom validation rules
 *
 * @param {Array.<{specific: String[], passes: passableCallback, custom: Object}>} args - arguments for Passable configuration
 * @return {object} Passable configuration settings
 */
function passableArgs(args: PassableArguments) {

    let passes: Function,
        specific: specific = [],
        custom: Rules = {};

    switch (args.length) {
      case 0:
        throw new TypeError('[passable]: Failed to execute `passableArgs`: At least 1 argument required, but only 0 present.');

      case 1: // [passes] = args;
        if (typeof args[0] != 'function') {
          throw new TypeError('[passable]: Failed to execute `passableArgs`: Unexpected ' + typeof args[0] + ', expected function');
        }
        args = [specific, ...args];

      case 2:
        args = (typeof args[1] == 'function') ? [...args, custom] : [specific, ...args];
    }

    [specific, passes, custom] = args;

    return {
        specific, passes, custom
    };
};

export default passableArgs;