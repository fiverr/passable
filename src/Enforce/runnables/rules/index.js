// @flow
import isArray from './lang/is_array';
import isNumber from './lang/is_number';
import isString from './lang/is_string';
import matches from './content/matches';
import inside from './content/inside';
import isNumeric from './content/is_numeric';
import isEmpty from './size/is_empty';
import sizeEquals from './size/size_equals';
import largerThan from './size/larger_than';
import smallerThan from './size/smaller_than';
import smallerThanOrEquals from './size/smaller_than_or_equals';
import largerThanOrEquals from './size/larger_than_or_equals';
import greaterThan from './size/greater_than';
import greaterThanOrEquals from './size/greater_than_or_equals';
import lessThan from './size/less_than';
import lessThanOrEquals from './size/less_than_or_equals';
import extendRules from './helpers/extend_rules';
import longerThan from './size/longer_than';
import longerThanOrEquals from './size/longer_than_or_equals';
import shorterThan from './size/shorter_than';
import shorterThanOrEquals from './size/shorter_than_or_equals';
import lengthEquals from './size/length_equals';

const rules: EnforceRules = {
    isArray,
    isNumber,
    isString,
    matches,
    inside,
    isNumeric,
    isEmpty,
    largerThan,
    smallerThan,
    smallerThanOrEquals,
    largerThanOrEquals,
    sizeEquals,
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