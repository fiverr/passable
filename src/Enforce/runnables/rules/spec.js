import rules from './index';
import { expect } from 'chai';
import shorterThan from './size/shorter_than';
import shorterThanOrEquals from './size/shorter_than_or_equals';
import longerThan from './size/longer_than';
import longerThanOrEquals from './size/longer_than_or_equals';
import hasLengthOf from './size/has_length_of';

describe('Tests enforce rules API', () => {
    it('Should expose all enforce rules', () => {
        allRules.forEach((rule) => {
            expect(rules[rule]).to.be.a('function');
        });
    });

    it('Exposed rule count should match actual count', () => {
        expect(Object.keys(rules).length).to.equal(allRules.length);
    });
});

const negativeRules = [
    'isNotArray',
    'isNotNumber',
    'isNotString',
    'notInside',
    'isNotNumeric',
    'isNotEmpty',
    'notMatches',
    'sizeNotEquals'
];

const positiveRules = [
    'isArray',
    'isNumber',
    'isString',
    'inside',
    'isNumeric',
    'isEmpty',
    'matches',
    'largerThan',
    'smallerThan',
    'smallerThanOrEquals',
    'largerThanOrEquals',
    'greaterThan',
    'lessThan',
    'lessThanOrEquals',
    'greaterThanOrEquals',
    'sizeEquals',
    'lt',
    'lte',
    'gt',
    'gte',
    'longerThan',
    'shorterThan',
    'shorterThanOrEquals',
    'longerThanOrEquals',
    'hasLengthOf',
    'sizeEquals'
];

const allRules = [].concat(positiveRules, negativeRules);
