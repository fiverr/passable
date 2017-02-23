'use strict'

import chai from 'chai';
import matchesRegex from './index';

const expect = chai.expect;

describe('Tests matchesRegex module', () => {

    it('Should return true for a matching string', () => {
        expect(matchesRegex('hello', {testAgainst: 'el'})).to.equal(true);
    });

    it('Should return false for a non matching string', () => {
        expect(matchesRegex('The strongest force in the world', {testAgainst: 'love'})).to.equal(false);
    });
});