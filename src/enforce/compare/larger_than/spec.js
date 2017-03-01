'use strict'

import chai from 'chai';
import largerThan from './index';

const expect = chai.expect;

describe('Tests largerThan module', () => {

    it('Should return true for an integer larger than 5', () => {
        expect(largerThan(6, {testAgainst: 5})).to.equal(true);
    });

    it('Should return false for an integer smaller than 8', () => {
        expect(largerThan(6, {testAgainst: 8})).to.equal(false);
    });
});