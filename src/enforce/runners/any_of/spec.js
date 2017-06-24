'use strict';

import chai from 'chai';
import anyOf from './index';
import rules from '../../rules';

const expect = chai.expect;

describe('Test any of Runner', () => {
    it('Should return false since no tests are specified', () => {
        expect(anyOf('abc', {}, rules)).to.equal(false);
    });

    it('Should return true on a single truthy test', () => {
        expect(anyOf('abc', { largerThan: 2 }, rules)).to.equal(true);
    });

    it('Should return true on multiple truthy tests', () => {
        expect(anyOf('abc', { largerThan: 2, smallerThan: 5 }, rules)).to.equal(true);
    });

    it('Should return true for a single truthy test among falsy tests', () => {
        expect(anyOf('abc', { largerThan: 2, smallerThan: 1 }, rules)).to.equal(true);
    });

    it('Should return false for falsy tests', () => {
        expect(anyOf('abc', { largerThan: 7, smallerThan: 1 }, rules)).to.equal(false);
    });
});