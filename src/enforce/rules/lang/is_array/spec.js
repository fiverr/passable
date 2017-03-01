'use strict'

import chai from 'chai';
import isArray from './index';

const expect = chai.expect;

describe('Tests isArray rule', () => {

    it('Should return true for an empty array', () => {
        expect(isArray([])).to.equal(true);
    });

    it('Should return true for an array with elements', () => {
        expect(isArray([1,2,3])).to.equal(true);
    });

    it('Should return false a string', () => {
        expect(isArray("1")).to.equal(false);
    });
});