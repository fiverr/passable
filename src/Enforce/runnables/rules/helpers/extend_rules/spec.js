'use strict';

import { test } from 'mocha';
import { expect } from 'chai';
import { random } from 'faker';
import extendRules from './index';

const isTruthy = (value) => !!value;
const isFalsy = (value) => !value;
const greaterThan = (value, arg1) => value > arg1;
const isSame = (...args) => Object.is(...args);
const isNull = (v) => v === null;

const dummyRules = {
    isTruthy,
    isFalsy,
    greaterThan,
    isSame,
    isNull
};

const WITH_NEGATIVE = [
    dummyRules.isTruthy,
    dummyRules.isFalsy
];

const WITH_ALIAS = [
    dummyRules.greaterThan,
    dummyRules.isNull
];

describe('Tests `extendRules` helper', () => {
    let rules = Object.assign({}, dummyRules);

    before(() => {
        WITH_ALIAS.forEach((rule) => rule.alias = random.word());
        WITH_NEGATIVE.forEach((rule) => rule.negativeForm = random.word());
    });

    beforeEach(() => {
        rules = extendRules(rules);
    });

    it('Should expose all original rules', () => {
        Object.keys(dummyRules).forEach((ruleName) => {
            expect(rules[ruleName]).to.equal(dummyRules[ruleName]);
        });
    });

    describe('negativeForm', () => {
        it('Should create a negativeForm rule for all rules with a negativeForm property', () => {
            WITH_NEGATIVE.forEach((rule) => {
                expect(rules[rule.negativeForm]).to.be.a('function');
            });
        });

        test('Negative form rule flips result value', () => {
            WITH_NEGATIVE.forEach((rule) => {
                const value = random.number();
                expect(rule(value)).to.equal(!rules[rule.negativeForm](value));
            });
        });
    });

    describe('alias', () => {
        it('Should alias each of the rules with an alias property', () => {
            WITH_ALIAS.forEach((rule) => {
                expect(rule).to.equal(rules[rule.alias]);
            });
        });
    });
});