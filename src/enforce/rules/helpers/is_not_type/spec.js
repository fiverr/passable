'use strict';

import chai from 'chai';
import isNotType from './index';

const expect = chai.expect,
    noop = () => undefined;

describe('Tests isNotType helper', () => {

    it('Should return correctly for an array', () => {
        expect(isNotType([], 'array')).to.equal(false);
        expect(isNotType(true, 'array')).to.equal(true);
        expect(isNotType('false', 'array')).to.equal(true);
        expect(isNotType(1, 'array')).to.equal(true);
        expect(isNotType({}, 'array')).to.equal(true);
        expect(isNotType(noop, 'array')).to.equal(true);
    });

    it('Should return correctly for a number', () => {
        expect(isNotType(1, 'number')).to.equal(false);
        expect(isNotType([], 'number')).to.equal(true);
        expect(isNotType(true, 'number')).to.equal(true);
        expect(isNotType('false', 'number')).to.equal(true);
        expect(isNotType({}, 'number')).to.equal(true);
        expect(isNotType(noop, 'number')).to.equal(true);
    });

    it('Should return correctly for a string', () => {
        expect(isNotType('', 'string')).to.equal(false);
        expect(isNotType('text', 'string')).to.equal(false);
        expect(isNotType(1, 'string')).to.equal(true);
        expect(isNotType([], 'string')).to.equal(true);
        expect(isNotType(true, 'string')).to.equal(true);
        expect(isNotType({}, 'string')).to.equal(true);
        expect(isNotType(noop, 'string')).to.equal(true);
    });

    it('Should return correctly for a function', () => {
        expect(isNotType(noop, 'function')).to.equal(false);
        expect(isNotType('', 'function')).to.equal(true);
        expect(isNotType(1, 'function')).to.equal(true);
        expect(isNotType([], 'function')).to.equal(true);
        expect(isNotType(true, 'function')).to.equal(true);
        expect(isNotType({}, 'function')).to.equal(true);
    });

    it('Should return correctly for an object', () => {
        expect(isNotType({}, 'object')).to.equal(false);
        expect(isNotType('', 'object')).to.equal(true);
        expect(isNotType(1, 'object')).to.equal(true);
        expect(isNotType(true, 'object')).to.equal(true);
        expect(isNotType(noop, 'object')).to.equal(true);
    });
});