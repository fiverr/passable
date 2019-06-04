// @flow
import isType from '../../../helpers/is_type';

function matches(value: string, regex: RegExp | string): boolean {

    if (regex instanceof RegExp) {
        return regex.test(value);
    } else if (isType(regex, 'string')) {
        return new RegExp(regex).test(value);
    } else {
        return false;
    }
}

matches.negativeForm = 'notMatches';

export default matches;