// @flow
import run from '../run';

export default function allOf(value: mixed, tests: Tests, rules: Rules): boolean {

    const testsCount: number = Object.keys(tests).length;
    let successCount: number = 0;

    if (testsCount === 0) {
        return false;
    }

    for (const key: string in tests) {
        const success: boolean = run(value, key, tests, rules);

        if (success === true) {
            successCount++;
        }
    }

    return successCount === testsCount;
}