function passableArgs(args) {

    let passes,
        specific,
        custom;

    if (args.length === 1) {
        passes = args[0];
    } else if (args.length === 3) {
        specific = args[0];
        passes = args[1];
        custom = args[2];
    } else if (args.length === 2) {
        if (typeof args[1] === 'function') {
            specific = args[0];
            passes = args[1];
        } else {
            passes = args[0];
            custom = args[1];
        }
    }

    specific = specific || [];
    custom = custom || {};

    return {
        passes, specific, custom
    };
};

export default passableArgs;