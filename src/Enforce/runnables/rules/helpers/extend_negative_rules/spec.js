'use strict';

import { expect } from 'chai';
import extendNegativeRules from './index';

function isTruthy(value) {
    return !!value;
}

isTruthy.negativeForm = 'isFalsy';

function largerThan(value, arg1) {
    return value > arg1;
}

const dummyRules = {
    isTruthy,
    largerThan
};

describe('Tests `extendNegativeRules` helper', () => {
    let rules = Object.assign({}, dummyRules);

    beforeEach(() => {
        rules = extendNegativeRules(rules);
    });

    it('Should expose all original rules', () => {
        Object.keys(dummyRules).forEach((ruleName) => {
            expect(rules[ruleName]).to.equal(dummyRules[ruleName]);
        });
    });

    it('Should only add functions for negative rules', () => {
        expect(Object.keys(rules).length).to.equal(3);
    });

    it('Should create negativeForm rule', () => {
        expect(rules.isFalsy).to.be.a('function');
    });

    it('negative rule should return correct falsy value', () => {
        expect(rules.isFalsy(true)).to.equal(false);
    });

    it('negative rule should return correct truthy value', () => {
        expect(rules.isFalsy(false)).to.equal(true);
    });

    it('negative rule should have an opposite value of original rule', () => {
        expect(rules.isFalsy(true)).to.equal(!rules.isTruthy(true));
    });
});