export default (passable) => {
    const WARN = passable.WARN;

    /*
    * Test cases:
    *   warn
    */

    const response = passable('case_a', null, (test) => {

        const enforce = passable.enforce;

        test('field_1', 'should be a string of 5 chars', () => {
            enforce('hello').allOf({
                sizeEquals: 5,
                isString: true
            });
        });

        test('field_2', 'must be a number smaller than 90', () => {
            enforce(99).allOf({
                smallerThan: 90,
                isNumber: true
            });
        });

        test('field_3', 'must be either "a" or "b"', () => {
            enforce('a').inside(['a', 'b']);
        });

        test('field_4', 'should be either "a" or "b"', () => {
            enforce('c').allOf({
                inside: ['a', 'b']
            });
        }, WARN);

        test('field_5', 'Must either be a number or a string. Always smaller than 5', () => {
            enforce('log').anyOf({
                isNumber: true,
                isString: true
            }).smallerThan(5);
        });

        test('field_5', 'Must not be larger than 3', () => {
            enforce('log').noneOf({
                largerThan: 3
            });
        });
    });

    const expect = {
        name: 'case_a',
        hasValidationErrors: true,
        hasValidationWarnings: true,
        failCount: 1,
        warnCount: 1,
        testCount: 6,
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
            },
            field_4: {
                testCount: 1,
                failCount: 0,
                warnCount: 1
            },
            field_5: {
                testCount: 2,
                failCount: 0,
                warnCount: 0
            }
        },
        validationErrors: {
            field_2: [
                'must be a number smaller than 90'
            ]
        },
        validationWarnings: {
            field_4: [
                'should be either "a" or "b"'
            ]
        },
        skipped: []
    };

    return {
        response,
        expect
    };
};