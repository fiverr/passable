import equals           from './compare/_equals';
import matchesRegex     from './compare/_matches_regex';
import isArray          from './lang/_is_array';
import isNumber         from './lang/_is_number';
import isString         from './lang/_is_string';
import isOfExactLength  from './size/_is_of_exact_length';
import isLongerThan     from './size/_is_longer_than';
import isShorterThan    from './size/_is_shorter_than';

const Tests = {
    equals,
    matchesRegex,
    isArray,
    isNumber,
    isString,
    isOfExactLength,
    isLongerThan,
    isShorterThan
};

export default Tests;