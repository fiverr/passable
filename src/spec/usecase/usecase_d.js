export default (passable, enforce) => {

    /*
        Test cases:
            * Inline custom rules
            * Import enforce directly from passable
    */

    const response = passable('case_d', (pass) => {
        pass('field_1', 'hello should equal hello', () => {
            enforce('hello').allOf({
                stringEquals: (value) => typeof value === 'string' && 'hello' === value
            });
        });

        pass('field_2', 'hello should equal hello', () => {
            enforce('hello').allOf({
                stringEquals: (value) => typeof value === 'string' && 'hell no' === value
            });
        });

        pass('field_3', 'should be longer than 2', () => {
            enforce(4).largerThan(2);
        });
    });

    const expect = {
        name: 'case_d',
        hasValidationErrors: true,
        hasValidationWarnings: false,
        failCount: 1,
        warnCount: 0,
        testCount: 3,
        testsPerformed: {
            field_1: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            },
            field_2: {
                testCount: 1,
                failCount: 1,
                warnCount: 0
            },
            field_3: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            }
        },
        validationErrors: {
            field_2: [
                'hello should equal hello'
            ]
        },
        validationWarnings: {},
        skipped: []
    };

    return {
        response,
        expect
    };
};