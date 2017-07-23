// @flow
import run from '../run';

export default function noneOf(value: any, tests: Object, rules: Rules): boolean {

    const testsCount = Object.keys(tests).length;
    let failCount = 0;

    if (testsCount === 0) {
        return false;
    }

    for (const key in tests) {

        const success = run(value, key, tests, rules);

        if (success === true) {
            continue;
        } else {
            failCount++;
        }
    }

    return failCount === testsCount;
}