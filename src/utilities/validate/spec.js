import validate from '.';
import { enforce } from '../../index';
import { expect } from 'chai';

describe('Utilities: validate', () => {
    it('Should return `false` for a failing test', () => {
        expect(validate(() => {
            enforce(33).greaterThan(100);
        })).to.equal(false);
    });

    it('Should return `false` for a falsy statement', () => {
        expect(validate(() => false)).to.equal(false);
    });

    it('Should return `true` for a truthy statement', () => {
        expect(validate(() => true)).to.equal(true);
    });

    it('Should return `true` for an empty test', () => {
        expect(validate(() => undefined)).to.equal(true);
    });

    it('Should throw TypeError when no tests are present', () => {
        expect(() => validate()).to.throw(TypeError);
    });
});
