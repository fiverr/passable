'use strict'

import chai from 'chai';
import sizeEquals from './index';

const expect = chai.expect;

describe('Tests sizeEquals rule', () => {

    it('Should return true for the same number', () => {
        expect(sizeEquals(5, {testAgainst: 5})).to.equal(true);
    });

    it('Should return false for a different number', () => {
        expect(sizeEquals(6, {testAgainst: 8})).to.equal(false);
    });
});