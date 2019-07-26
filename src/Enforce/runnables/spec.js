import rules from './index';
import { expect } from 'chai';

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
    'notEquals',
    'isNotNumeric',
    'isNotEmpty',
    'lengthNotEquals',
    'notMatches'
];

const positiveRules = [
    'isArray',
    'isNumber',
    'isString',
    'inside',
    'equals',
    'isNumeric',
    'isEmpty',
    'matches',
    'greaterThan',
    'lessThan',
    'lessThanOrEquals',
    'greaterThanOrEquals',
    'lt',
    'lte',
    'gt',
    'gte',
    'longerThan',
    'shorterThan',
    'shorterThanOrEquals',
    'longerThanOrEquals',
    'lengthEquals',
    'isOdd'
];

const allRules = [...new Set([...positiveRules, ...negativeRules])];
