import isArray from './rules/is_array';
import isNumber from './rules/is_number';
import isString from './rules/is_string';
import matches from './rules/matches';
import inside from './rules/inside';
import equals from './rules/equals';
import isNumeric from './rules/is_numeric';
import isEmpty from './rules/is_empty';
import greaterThan from './rules/greater_than';
import greaterThanOrEquals from './rules/greater_than_or_equals';
import lessThan from './rules/less_than';
import lessThanOrEquals from './rules/less_than_or_equals';
import longerThan from './rules/longer_than';
import longerThanOrEquals from './rules/longer_than_or_equals';
import shorterThan from './rules/shorter_than';
import shorterThanOrEquals from './rules/shorter_than_or_equals';
import lengthEquals from './rules/length_equals';
import extendRules from './helpers/extend_rules';

const rules = {
    isArray,
    isNumber,
    isString,
    matches,
    inside,
    equals,
    isNumeric,
    isEmpty,
    greaterThan,
    greaterThanOrEquals,
    lessThan,
    lessThanOrEquals,
    longerThan,
    longerThanOrEquals,
    shorterThan,
    shorterThanOrEquals,
    lengthEquals
};

export default extendRules(rules);