'use strict'

import chai from 'chai';
import isString from '../src/tests/lang/_is_string';

const expect = chai.expect;

describe('Tests isString module', () => {

    it('Should return false for a number', () => {
        expect(isString(42)).to.equal(false);
    });

    it('Should return false for an array', () => {
        expect(isString([])).to.equal(false);
    });

    it('Should return true a string', () => {
        expect(isString("I love you")).to.equal(true);
    });
});