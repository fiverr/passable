'use strict'

import chai from 'chai';
import isOfExactLength from '../src/tests/size/_is_of_exact_length';

const expect = chai.expect;

describe('Tests isOfExactLength module', () => {

    it('Should return true for an array of length 5', () => {
        expect(isOfExactLength([1,2,3,4,5], 5)).to.equal(true);
    });

    it('Should return false for an array of length 8', () => {
        expect(isOfExactLength([1,2,3,4,5,6], 8)).to.equal(false);
    });

    it('Should return true for a string of length 3', () => {
        expect(isOfExactLength("abc", 3)).to.equal(true);
    });
});