import matchesRegex      from './matches_regex';
import isArray           from './is_array';
import isNumber          from './is_number';
import isString          from './is_string';
import isOfExactLength   from './is_of_exact_length';
import isLongerThan      from './is_longer_than';
import isShorterThan     from './is_shorter_than';

export default () => ({
    matchesRegex,
    isArray,
    isNumber,
    isString,
    isOfExactLength,
    isLongerThan,
    isShorterThan
});