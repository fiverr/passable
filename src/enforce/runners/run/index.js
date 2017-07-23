// @flow
export default function run(value: any, key: string, tests: Object, rules: Rules): boolean {

    if (!(typeof rules[key] === 'function')) {
        return false;
    }

    const args = tests[key];

    return rules[key](value, args);
}