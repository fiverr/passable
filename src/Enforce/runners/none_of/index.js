// @flow
import run from '../run';

export default function noneOf(value: mixed, tests: CompoundTestObject, rules: EnforceRules): boolean {

    const validations: Array<string> = Object.keys(tests);

    if (validations.length === 0) {
        return false;
    }

    return validations.every((key) => run(value, key, tests, rules) !== true);
}