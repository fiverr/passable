'use strict'

import Enforce from './index';
import chai from 'chai';

const expect = chai.expect,
    enforce = Enforce();

const failOnImplicitTrue = enforce([1, 2, 3], {
    isLongerThan: {
        testAgainst: 4
    }
});

const faileOnExplicitTrue = enforce([1, 2, 3], {
    isLongerThan: {
        testAgainst: 4,
        expect: true
    }
});

const passOnExplicitFlip = enforce([1, 2, 3], {
    isLongerThan: {
        testAgainst: 4,
        expect: false
    }
});

const failOnExplicitFlip = enforce([1, 2, 3], {
    isShorterThan: {
        testAgainst: 4,
        expect: false
    }
});

describe('Test Passable\'s enforce function', () => {

    it('Should fail with implicitly true "expect"', () => {
        expect(failOnImplicitTrue).to.equal(false);
    });

    it('Should fail with explicitly true "expect"', () => {
        expect(faileOnExplicitTrue).to.equal(false);
    });

    it('Should pass with explicitly false "expect"', () => {
        expect(passOnExplicitFlip).to.equal(true);
    });

    it('Should fail with explicitly false "expect"', () => {
        expect(failOnExplicitFlip).to.equal(false);
    });
});