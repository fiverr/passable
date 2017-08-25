// @flow
export default function run(value: AnyValue, key: string, tests: Tests, rules: Rules): boolean {

    if (!(typeof rules[key] === 'function')) {
        return false;
    }

    const args: mixed = tests[key];

    return rules[key](value, args);
}