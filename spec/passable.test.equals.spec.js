'use strict'

import chai from 'chai';
import equals from '../src/tests/compare/_equals';

const expect = chai.expect;

describe('Tests equalst module', () => {

    it('Should return false for object literal comparison', () => {
        expect(equals({}, {})).to.equal(false);
    });

    it('Should return true for same number comparison', () => {
        expect(equals(1, 1)).to.equal(true);
    });

    it('Should return false for number and string comparison', () => {
        expect(equals(1, "1")).to.equal(false);
    });
});