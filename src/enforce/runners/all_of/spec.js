'use strict'

import chai from 'chai';
import allOf from './index';
import rules from '../../rules';

const expect = chai.expect;

describe('Test allOf Runner', () => {
    it('Should return false since no tests are specified', () => {
        expect(allOf('abc', {}, rules)).to.equal(false);
    });

    it('Should return true on a truthy test', () => {
        expect(allOf('abc', { largerThan: 2 }, rules)).to.equal(true);
    });

    it('Should return true on multiple truthy tests', () => {
        expect(allOf('abc', { largerThan: 2, smallerThan: 7 }, rules)).to.equal(true);
    });

    it('Should return false on a single falsy test', () => {
        expect(allOf('abc', { smallerThan: 3 }, rules)).to.equal(false);
    });

    it('Should return false on a single falsy tests among truthy tests', () => {
        expect(allOf('abc', { smallerThan: 3, largerThan: 2 }, rules)).to.equal(false);
    });
});