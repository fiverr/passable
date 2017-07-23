// @flow
function passRunner(callback: Function): boolean {

    let isValid = null;

    if (typeof callback !== 'function') {
        return false;
    }

    try {
        const res = callback();

        if (typeof res !== 'undefined' && res !== null && res.hasOwnProperty('valid')) {
            isValid = res.valid;
        } else if (typeof res === 'boolean') {
            isValid = res || false;
        } else {
            isValid = true;
        }
    } catch (e) {
        isValid = false;
    }

    return !!isValid;
}

export default passRunner;