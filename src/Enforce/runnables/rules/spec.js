'use strict';

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
    'sizeEquals'
];

const allRules = [].concat(positiveRules, negativeRules);
