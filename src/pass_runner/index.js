function passRunner(callback) {

    let isValid = null;

    if (typeof callback !== 'function') {
        return false;
    }

    const res = callback();

    if (typeof res !== 'undefined' && res !== null && res.hasOwnProperty('valid')) {
        isValid = res.valid;
    } else if (typeof res === 'boolean') {
        isValid = res || false;
    } else if (this.valid) {
        isValid = this.valid;
    }

    return !!isValid;
}

export default passRunner;