// @flow
import run from '../run';

export default function noneOf(value: mixed, tests: Tests, rules: Rules): boolean {

    const testsCount: number = Object.keys(tests).length;
    let failCount: number = 0;

    if (testsCount === 0) {
        return false;
    }

    for (const key: string in tests) {

        const success: boolean = run(value, key, tests, rules);

        if (success === true) {
            continue;
        } else {
            failCount++;
        }
    }

    return failCount === testsCount;
}