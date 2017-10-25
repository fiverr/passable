// @flow
import run from '../run';

export default function anyOf(value: mixed, tests: Tests, rules: Rules): boolean {

    const validations: Array<string> = Object.keys(tests);
    return validations.some((key) => run(value, key, tests, rules) === true);
}
