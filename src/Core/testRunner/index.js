// @flow
function testRunner(test: Function): boolean {

    let isValid: null | boolean = null;

    try {
        const res: testRunnerCallback = test();

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

function testRunnerAsync(test: Function, done: Function, fail: Function): void {
    try {
        test.then(done, fail);
    } catch (e) {
        fail();
    }
}

export { testRunnerAsync, testRunner };