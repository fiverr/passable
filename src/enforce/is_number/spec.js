'use strict'

import chai from 'chai';
import isNumber from './index';

const expect = chai.expect;

describe('Tests isNumber module', () => {

    it('Should return true for a number', () => {
        expect(isNumber(42)).to.equal(true);
    });

    it('Should return true for a NaN', () => {
        expect(isNumber(NaN)).to.equal(true);
    });

    it('Should return false a string', () => {
        expect(isNumber("1")).to.equal(false);
    });

    it('Should return false an array', () => {
        expect(isNumber([1,2,3])).to.equal(false);
    });
});