'use strict'

import chai from 'chai';
import hasLengthOf from './index';

const expect = chai.expect;

describe('Tests hasLengthOf module', () => {

    it('Should return true for an array of length 5', () => {
        expect(hasLengthOf([1,2,3,4,5], {testAgainst: 5})).to.equal(true);
    });

    it('Should return false for an array of length 8', () => {
        expect(hasLengthOf([1,2,3,4,5,6], {testAgainst: 8})).to.equal(false);
    });

    it('Should return true for a string of length 3', () => {
        expect(hasLengthOf("abc", {testAgainst: 3})).to.equal(true);
    });
});