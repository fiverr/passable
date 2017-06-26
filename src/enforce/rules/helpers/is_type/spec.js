'use strict';

import chai from 'chai';
import isType from './index';

const expect = chai.expect,
    noop = () => undefined;

describe('Tests isType helper', () => {

    it('Should return correctly for an array (expecting true)', () => {
        expect(isType([], 'array', true)).to.equal(true);
        expect(isType(true, 'array', true)).to.equal(false);
        expect(isType('false', 'array', true)).to.equal(false);
        expect(isType(1, 'array', true)).to.equal(false);
        expect(isType({}, 'array', true)).to.equal(false);
        expect(isType(noop, 'array', true)).to.equal(false);
    });

    it('Should return correctly for an array (expecting false)', () => {
        expect(isType([], 'array', false)).to.equal(false);
        expect(isType(true, 'array', false)).to.equal(true);
        expect(isType('false', 'array', false)).to.equal(true);
        expect(isType(1, 'array', false)).to.equal(true);
        expect(isType({}, 'array', false)).to.equal(true);
        expect(isType(noop, 'array', false)).to.equal(true);
    });

    it('Should return correctly for a number (expecting true)', () => {
        expect(isType(1, 'number', true)).to.equal(true);
        expect(isType([], 'number', true)).to.equal(false);
        expect(isType(true, 'number', true)).to.equal(false);
        expect(isType('false', 'number', true)).to.equal(false);
        expect(isType({}, 'number', true)).to.equal(false);
        expect(isType(noop, 'number', true)).to.equal(false);
    });

    it('Should return correctly for a number (expecting false)', () => {
        expect(isType(1, 'number', false)).to.equal(false);
        expect(isType([], 'number', false)).to.equal(true);
        expect(isType(true, 'number', false)).to.equal(true);
        expect(isType('false', 'number', false)).to.equal(true);
        expect(isType({}, 'number', false)).to.equal(true);
        expect(isType(noop, 'number', false)).to.equal(true);
    });

    it('Should return correctly for a string (expecting true)', () => {
        expect(isType('', 'string', true)).to.equal(true);
        expect(isType('text', 'string', true)).to.equal(true);
        expect(isType(1, 'string', true)).to.equal(false);
        expect(isType([], 'string', true)).to.equal(false);
        expect(isType(true, 'string', true)).to.equal(false);
        expect(isType({}, 'string', true)).to.equal(false);
        expect(isType(noop, 'string', true)).to.equal(false);
    });

    it('Should return correctly for a string (expecting false)', () => {
        expect(isType('', 'string', false)).to.equal(false);
        expect(isType('text', 'string', false)).to.equal(false);
        expect(isType(1, 'string', false)).to.equal(true);
        expect(isType([], 'string', false)).to.equal(true);
        expect(isType(true, 'string', false)).to.equal(true);
        expect(isType({}, 'string', false)).to.equal(true);
        expect(isType(noop, 'string', false)).to.equal(true);
    });

    it('Should return correctly for a function (expecting true)', () => {
        expect(isType(noop, 'function', true)).to.equal(true);
        expect(isType('', 'function', true)).to.equal(false);
        expect(isType(1, 'function', true)).to.equal(false);
        expect(isType([], 'function', true)).to.equal(false);
        expect(isType(true, 'function', true)).to.equal(false);
        expect(isType({}, 'function', true)).to.equal(false);
    });

    it('Should return correctly for a function (expecting false)', () => {
        expect(isType(noop, 'function', false)).to.equal(false);
        expect(isType('', 'function', false)).to.equal(true);
        expect(isType(1, 'function', false)).to.equal(true);
        expect(isType([], 'function', false)).to.equal(true);
        expect(isType(true, 'function', false)).to.equal(true);
        expect(isType({}, 'function', false)).to.equal(true);
    });

    it('Should return correctly for an object (expecting true)', () => {
        expect(isType({}, 'object', true)).to.equal(true);
        expect(isType('', 'object', true)).to.equal(false);
        expect(isType(1, 'object', true)).to.equal(false);
        expect(isType(true, 'object', true)).to.equal(false);
        expect(isType(noop, 'object', true)).to.equal(false);
    });

    it('Should return correctly for an object (expecting false)', () => {
        expect(isType({}, 'object', false)).to.equal(false);
        expect(isType('', 'object', false)).to.equal(true);
        expect(isType(1, 'object', false)).to.equal(true);
        expect(isType(true, 'object', false)).to.equal(true);
        expect(isType(noop, 'object', false)).to.equal(true);
    });
});