'use strict';

import { expect } from 'chai';
import isEmpty from './index';

describe('Tests isEmpty rule (expect true)', () => {

    it('Should return false for a non-empty array', () => {
        expect(isEmpty([1, 2, 3, 4, 5, 6], true)).to.equal(false);
    });

    it('Should return true for an empty array', () => {
        expect(isEmpty([], true)).to.equal(true);
    });

    it('Should return false for a non-empty objecd', () => {
        expect(isEmpty({a:1}, true)).to.equal(false);
    });

    it('Should return true for an empty object', () => {
        expect(isEmpty({}, true)).to.equal(true);
    });

    it('Should return true for an empty string', () => {
        expect(isEmpty('', true)).to.equal(true);
    });

    it('Should return false for a non empty string', () => {
        expect(isEmpty('hey', true)).to.equal(false);
    });

    it('Should return true for zero', () => {
        expect(isEmpty(0, true)).to.equal(true);
    });

    it('Should return false for one', () => {
        expect(isEmpty(1, true)).to.equal(false);
    });

    it('Should return true for undefined', () => {
        expect(isEmpty(undefined, true)).to.equal(true);
    });

    it('Should return true for null', () => {
        expect(isEmpty(null, true)).to.equal(true);
    });

    it('Should return true for NaN', () => {
        expect(isEmpty(NaN, true)).to.equal(true);
    });
});

describe('Tests isEmpty rule (expect false)', () => {

    it('Should return true for a non-empty array', () => {
        expect(isEmpty([1, 2, 3, 4, 5, 6], false)).to.equal(true);
    });

    it('Should return false for an empty array', () => {
        expect(isEmpty([], false)).to.equal(false);
    });

    it('Should return true for a non-empty objec', () => {
        expect(isEmpty({a:1}, false)).to.equal(true);
    });

    it('Should return false for an empty object', () => {
        expect(isEmpty({}, false)).to.equal(false);
    });

    it('Should return false for an empty string', () => {
        expect(isEmpty('', false)).to.equal(false);
    });

    it('Should return true for a non empty string', () => {
        expect(isEmpty('hey', false)).to.equal(true);
    });

    it('Should return false for zero', () => {
        expect(isEmpty(0, false)).to.equal(false);
    });

    it('Should return true for one', () => {
        expect(isEmpty(1, false)).to.equal(true);
    });

    it('Should return false for undefined', () => {
        expect(isEmpty(undefined, false)).to.equal(false);
    });

    it('Should return false for null', () => {
        expect(isEmpty(null, false)).to.equal(false);
    });

    it('Should return false for NaN', () => {
        expect(isEmpty(NaN, false)).to.equal(false);
    });

    it('Should return true for false', () => {
        expect(isEmpty(false, true)).to.equal(true);
    });

    it('Should return false for false', () => {
        expect(isEmpty(false, false)).to.equal(false);
    });
});