'use strict';

import validate from './index.js';
import { enforce } from '../index';
import { expect } from 'chai';

describe('Test validate function', () => {
    it('Should return correct failing response Object when all arguments passed', () => {
        expect(validate('Error string', () => {
            enforce(33).largerThan(100);
        })).to.deep.equal({
            message: 'Error string',
            valid: false
        });
    });

    it('Should return `valid: false` for a failing validation when no message passed', () => {
        expect(validate(() => {
            enforce(33).largerThan(100);
        })).to.deep.equal({ valid: false });
    });

    it('Should return `valid: false` for a `false` statement', () => {
        expect(validate(() => false)).to.deep.equal({ valid: false });
    });

    it('Should return `valid: false` and error message for a `false` statement', () => {
        expect(validate('Error string', () => false)).to.deep.equal({
            message: 'Error string',
            valid: false
        });
    });

    it('Should return `valid: true` for a `true` statement', () => {
        expect(validate(() => true)).to.deep.equal({ valid: true });
    });

    it('Should return `valid: true` for an empty test', () => {
        expect(validate(() => undefined)).to.deep.equal({ valid: true });
    });

    it('Should return `valid: true` when no arguments passed', () => {
        expect(validate()).to.deep.equal({ valid: true });
    });
});