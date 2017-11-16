'use strict';

import { expect } from 'chai';
import isType from './index';

const noop = () => undefined;

describe('Tests isType helper', () => {
    let types;

    beforeEach(() => {
        types = ['array', 'boolean', 'number', 'string', 'object', 'function'];
    });

    it('Should return correctly for an array', () => {
        types = types.filter((t) => t !== 'object');
        expect(isType([], 'array')).to.equal(true);
        expect(isType([], ...types)).to.equal(true);

        expect(isType(true, 'array')).to.equal(false);
        expect(isType('false', 'array')).to.equal(false);
        expect(isType(1, 'array')).to.equal(false);
        expect(isType({}, 'array')).to.equal(false);
        expect(isType(noop, 'array')).to.equal(false);

        types = types.filter((t) => t !== 'array');
        expect(isType([], ...types)).to.equal(false);
    });

    it('Should return correctly for a number', () => {
        expect(isType(1, 'number')).to.equal(true);
        expect(isType(1, ...types)).to.equal(true);
        expect(isType([], 'number')).to.equal(false);
        expect(isType(true, 'number')).to.equal(false);
        expect(isType('false', 'number')).to.equal(false);
        expect(isType({}, 'number')).to.equal(false);
        expect(isType(noop, 'number')).to.equal(false);

        types = types.filter((t) => t !== 'number');
        expect(isType(1, ...types)).to.equal(false);
    });

    it('Should return correctly for a string', () => {
        expect(isType('', 'string')).to.equal(true);
        expect(isType('', ...types)).to.equal(true);
        expect(isType('text', 'string')).to.equal(true);
        expect(isType(1, 'string')).to.equal(false);
        expect(isType([], 'string')).to.equal(false);
        expect(isType(true, 'string')).to.equal(false);
        expect(isType({}, 'string')).to.equal(false);
        expect(isType(noop, 'string')).to.equal(false);

        types = types.filter((t) => t !== 'string');
        expect(isType('', ...types)).to.equal(false);
    });

    it('Should return correctly for a function', () => {
        expect(isType(noop, 'function')).to.equal(true);
        expect(isType(noop, ...types)).to.equal(true);
        expect(isType('', 'function')).to.equal(false);
        expect(isType(1, 'function')).to.equal(false);
        expect(isType([], 'function')).to.equal(false);
        expect(isType(true, 'function')).to.equal(false);
        expect(isType({}, 'function')).to.equal(false);

        types = types.filter((t) => t !== 'function');
        expect(isType(noop, ...types)).to.equal(false);
    });

    it('Should return correctly for an object', () => {
        expect(isType({}, 'object')).to.equal(true);
        expect(isType({}, ...types)).to.equal(true);
        expect(isType('', 'object')).to.equal(false);
        expect(isType(1, 'object')).to.equal(false);
        expect(isType(true, 'object')).to.equal(false);
        expect(isType(noop, 'object')).to.equal(false);

        types = types.filter((t) => t !== 'object');
        expect(isType({}, ...types)).to.equal(false);
    });
});