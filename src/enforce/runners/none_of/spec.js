'use strict'

import chai from 'chai';
import noneOf from './index';
import rules from '../../rules';

const expect = chai.expect;

describe('Test noneOf Runner', () => {
    it('Should return false since no tests are specified', () => {
        expect(noneOf('abc', {}, rules)).to.equal(false);
    });

    it('Should return false on a truthy result', () => {
        expect(noneOf('abc', { largerThan: 2 }, rules)).to.equal(false);
    });

    it('Should return true on a falsy result', () => {
        expect(noneOf('abc', { largerThan: 5 }, rules)).to.equal(true);
    });
});