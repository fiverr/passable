import matchesRegex      from './matches_regex';
import isArray           from './is_array';
import isNumber          from './is_number';
import isString          from './is_string';
import hasLengthOf       from './compare/has_length_of';
import longerThan        from './compare/longer_than';
import shorterThan       from './compare/shorter_than';

export default () => ({
    matchesRegex,
    isArray,
    isNumber,
    isString,
    hasLengthOf,
    longerThan,
    shorterThan
});