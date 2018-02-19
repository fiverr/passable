'use strict';

import Specific from './index';
import { expect } from 'chai';

describe('Test Specific class constructor', () => {
    describe('Test default value fallback', () => {

        const defaultObject = {};

        it('Should return default object when no args passed', () => {
            expect(() => new Specific()).to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'undefined'. Expected `specific` at position 1.");
        });

        it('Should return default object when specific is explicitly null', () => {
            expect(new Specific(null)).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is an empty string', () => {
            expect(new Specific('')).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is an empty array', () => {
            expect(new Specific([])).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is of wrong type', () => {
            expect(() => new Specific(new Set())).to.throw(TypeError);
            expect(() => new Specific(new Map())).to.throw(TypeError);
            expect(() => new Specific(55)).to.throw(TypeError);
            expect(() => new Specific(true)).to.throw(TypeError);
        });
    });

    describe('Test legacy api', () => {
        it('Should store array values in `only`', () => {
            expect(new Specific(['field_1', 'field_2'])).to.deep.equal({
                only: {
                    field_1: true,
                    field_2: true
                }
            });
        });

        it('Should store string value in `only`', () => {
            expect(new Specific('field_1')).to.deep.equal({
                only: {
                    field_1: true
                }
            });
        });
    });

    describe('Test Object input', () => {
        it('Should add `only` array values to `only` object', () => {
            expect(new Specific({
                only: ['f1', 'f2']
            })).to.deep.equal({
                only: {
                    f1: true,
                    f2: true
                }
            });
        });

        it('Should add `not` array values to `not` object', () => {
            expect(new Specific({
                not: ['f1', 'f2']
            })).to.deep.equal({
                not: {
                    f1: true,
                    f2: true
                }
            });
        });

        it('Should add array values to correct object', () => {
            expect(new Specific({
                only: ['f1', 'f2'],
                not: ['f3', 'f4']
            })).to.deep.equal({
                only: {
                    f1: true,
                    f2: true
                },
                not: {
                    f3: true,
                    f4: true
                }
            });
        });

        it('Should add `only` string values to `only` object', () => {
            expect(new Specific({
                only: 'f1'
            })).to.deep.equal({
                only: {
                    f1: true
                }
            });
        });

        it('Should add `not` string values to `not` object', () => {
            expect(new Specific({
                not: 'f1'
            })).to.deep.equal({
                not: {
                    f1:true
                }
            });
        });

        it('Should add string values to correct object', () => {
            expect(new Specific({
                only: 'f1',
                not: 'f3'
            })).to.deep.equal({
                only: {
                    f1: true
                },
                not: {
                    f3: true
                }
            });
        });
    });
});

describe('Test `is` (specific) function', () => {
    describe('Test truthy returns', () => {
        it('Should return true for an empty array', () => {
            expect(Specific.is([])).to.equal(true);
        });

        it('Should return true for an empty string', () => {
            expect(Specific.is('')).to.equal(true);
        });

        it('Should return true for an Object with `only`', () => {
            expect(Specific.is({only: ''})).to.equal(true);
        });

        it('Should return true for an Object with `not`', () => {
            expect(Specific.is({not: ''})).to.equal(true);
        });

        it('Should return false for an Object without `not` or `only`', () => {
            expect(Specific.is({})).to.equal(false);
        });

        it('Should return true for null', () => {
            expect(Specific.is(null)).to.equal(true);
        });

        it('Should return true for an array of strings', () => {
            expect(Specific.is(['a', 'b', 'c'])).to.equal(true);
        });

        it('Should return true for a string', () => {
            expect(Specific.is('a')).to.equal(true);
        });
    });

    describe('Test falsy returns', () => {
        it('Should return false for an array of mixed types', () => {
            expect(Specific.is([1, 'f2'])).to.equal(false);
        });

        it('Should return false for a number', () => {
            expect(Specific.is(55)).to.equal(false);
        });

        it('Should return false for a boolean', () => {
            expect(Specific.is(true)).to.equal(false);
        });
    });
});