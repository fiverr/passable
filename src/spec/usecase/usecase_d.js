export default (passable) => {

    /*
     * Test cases:
     *   No throw on empty dynamic `specific`
     *   No errors or warnings
     */


    const response = ((specific) => passable('case_d', specific, (pass, enforce) => {
        pass('field_1', 'should be a string of 5 chars', () => {
            enforce('hello').allOf({
                sizeEquals: 5,
                isString: true
            });
        });

        pass('field_2', 'must be a number smaller than 90', () => {
            enforce(10).allOf({
                smallerThan: 90,
                isNumber: true
            });
        });
    }))();

    const expect = {
        name: 'case_d',
        hasValidationErrors: false,
        hasValidationWarnings: false,
        failCount: 0,
        warnCount: 0,
        testCount: 2,
        testsPerformed: {
            field_1: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            },
            field_2: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            }
        },
        validationErrors: {},
        validationWarnings: {},
        skipped: []
    };

    return {
        response,
        expect
    };
};