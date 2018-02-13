'use strict';

import isSpecific from './index';
import { expect } from 'chai';

describe('Test isSpecific function', () => {
    describe('Test truthy returns', () => {
        it('Should return true for an empty array', () => {
            expect(isSpecific([])).to.equal(true);
        });

        it('Should return true for an empty string', () => {
            expect(isSpecific('')).to.equal(true);
        });

        it('Should return true for an Object', () => {
            expect(isSpecific({})).to.equal(true);
        });

        it('Should return true for null', () => {
            expect(isSpecific(null)).to.equal(true);
        });

        it('Should return true for an array of strings', () => {
            expect(isSpecific(['a', 'b', 'c'])).to.equal(true);
        });

        it('Should return true for a string', () => {
            expect(isSpecific('a')).to.equal(true);
        });
    });

    describe('Test falsy returns', () => {
        it('Should return false for an array of mixed types', () => {
            expect(isSpecific([1, 'f2'])).to.equal(false);
        });

        it('Should return false for a number', () => {
            expect(isSpecific(55)).to.equal(false);
        });

        it('Should return false for a boolean', () => {
            expect(isSpecific(true)).to.equal(false);
        });
    });
});