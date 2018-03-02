// @flow
import isArray from './lang/is_array';
import isNumber from './lang/is_number';
import isString from './lang/is_string';
import matches from './content/matches';
import inside from './content/inside';
import isEmpty from './size/is_empty';
import sizeEquals from './size/size_equals';
import largerThan from './size/larger_than';
import smallerThan from './size/smaller_than';
import smallerThanOrEquals from './size/smaller_than_or_equals';
import largerThanOrEquals from './size/larger_than_or_equals';

export default {
    isArray,
    isNumber,
    isString,
    matches,
    inside,
    isEmpty,
    largerThan,
    smallerThan,
    smallerThanOrEquals,
    largerThanOrEquals,
    sizeEquals
};