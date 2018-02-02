'use strict';

import buildSpecificObject from './index';
import { expect } from 'chai';

describe('Test buildSpecificObject function', () => {
    describe('Test default value fallback', () => {

        const defaultObject = {
            only: new Set(),
            not: new Set()
        };

        it('Should return default object when no args passed', () => {
            expect(buildSpecificObject()).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is explicitly null', () => {
            expect(buildSpecificObject(null)).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is an empty string', () => {
            expect(buildSpecificObject('')).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is an empty array', () => {
            expect(buildSpecificObject([])).to.deep.equal(defaultObject);
        });

        it('Should return default object when specific is of wrong type', () => {
            expect(buildSpecificObject(new Set())).to.deep.equal(defaultObject);
            expect(buildSpecificObject(new Map())).to.deep.equal(defaultObject);
            expect(buildSpecificObject(55)).to.deep.equal(defaultObject);
            expect(buildSpecificObject(true)).to.deep.equal(defaultObject);
        });
    });

    describe('Test legacy api', () => {
        it('Should store array values in `only`', () => {
            expect(buildSpecificObject(['field_1', 'field_2'])).to.deep.equal({
                only: new Set(['field_1', 'field_2']),
                not: new Set()
            });
        });

        it('Should store string value in `only`', () => {
            expect(buildSpecificObject('field_1')).to.deep.equal({
                only: new Set(['field_1']),
                not: new Set()
            });
        });
    });

    describe('Test Object input', () => {
        it('Should add `only` array values to `only` set', () => {
            expect(buildSpecificObject({
                only: ['f1', 'f2']
            })).to.deep.equal({
                only: new Set(['f1', 'f2']),
                not: new Set()
            });
        });

        it('Should add `not` array values to `not` set', () => {
            expect(buildSpecificObject({
                not: ['f1', 'f2']
            })).to.deep.equal({
                only: new Set(),
                not: new Set(['f1', 'f2'])
            });
        });

        it('Should add array values to correct set', () => {
            expect(buildSpecificObject({
                only: ['f1', 'f2'],
                not: ['f3', 'f4']
            })).to.deep.equal({
                only: new Set(['f1', 'f2']),
                not: new Set(['f3', 'f4'])
            });
        });

        it('Should add `only` string values to `only` set', () => {
            expect(buildSpecificObject({
                only: 'f1'
            })).to.deep.equal({
                only: new Set(['f1']),
                not: new Set()
            });
        });

        it('Should add `not` string values to `not` set', () => {
            expect(buildSpecificObject({
                not: 'f1'
            })).to.deep.equal({
                only: new Set(),
                not: new Set(['f1'])
            });
        });

        it('Should add string values to correct set', () => {
            expect(buildSpecificObject({
                only: 'f1',
                not: 'f3'
            })).to.deep.equal({
                only: new Set(['f1']),
                not: new Set(['f3'])
            });
        });
    });
});