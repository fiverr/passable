// @flow
import run from '../run';
import allOf from '../all_of';

export default function noneOf(value: mixed, tests: Tests, rules: Rules): boolean {

    const validations: Array<string> = Object.keys(tests);

    if (validations.length === 0) {
        return false;
    }

    return !allOf(value, tests, rules);
}