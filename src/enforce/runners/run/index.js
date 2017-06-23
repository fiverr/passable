export default function run(value, key, tests, rules) {

    if (!(typeof rules[key] === 'function')) {
        return false;
    }

    const args = tests[key];

    return rules[key](value, args);
}