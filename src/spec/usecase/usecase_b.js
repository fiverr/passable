export default (passable) => {
    const WARN = passable.WARN;

    const enforce = passable.enforce;

    const response = passable('case_b', (test) => {
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
            enforce('a').allOf({
                inside: ['a', 'b']
            });
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
            }).allOf({
                smallerThan: 5
            });
        });

        test('field_5', 'Must not be larger than 3', () => {
            enforce('log').noneOf({
                largerThan: 3
            });
        });
    }, ['field_1', 'field_4']);

    const expect = {
        async: null,
        name: 'case_b',
        hasValidationErrors: false,
        hasValidationWarnings: true,
        failCount: 0,
        warnCount: 1,
        testCount: 2,
        testsPerformed: {
            field_1: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            },
            field_4: {
                testCount: 1,
                failCount: 0,
                warnCount: 1
            }
        },
        validationErrors: {
        },
        validationWarnings: {
            field_4: [
                'should be either "a" or "b"'
            ]
        },
        skipped: ['field_2', 'field_3', 'field_5'],
        completionCallbacks: []
    };

    return {
        response,
        expect
    };
};