class PassRun {

    constructor() {
        this.valid = null;
        return this;
    }

    run(callback) {

        if (typeof callback === 'function') {
            // run the validation logic

            // we're binding the callback so that enforce
            // can edit the state without returning
            this.callback = callback.bind(this);
            const res = this.callback();

            if (typeof res !== 'undefined' && res !== null && res.hasOwnProperty('valid')) {
                this.valid = res.valid;
            } else if (typeof res === 'boolean') {
                this.valid = res || false;
            }
        }

        return !!this.valid;
    }

}

const passRun = (callback) => new PassRun(callback);

export default passRun;