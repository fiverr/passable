'use strict';

import compound from './index';
import { expect } from 'chai';

describe('Test Passable\'s enforce - chainable - compound function', () => {
    it('Should return bound object if already invalid', () => {
        const self = { valid: false };
        expect(compound.bind(self)()).to.equal(self);
    });

    it('Should call passed function against value and add valid:true to bound object', () => {
        const self = { success: true };
        const expression = compound.bind(self)(1, 'allOf', { isInt: true }, { isInt: (v) => Number.isInteger(v) });
        expect(expression.valid).to.equal(true);
        expect(self.valid).to.equal(true);
    });

    it('Should call passed function against value and throw if invalid', () => {
        const func = compound.bind({});
        expect(() => func(('t', 'allOf', { isInt: true }, { isInt: (v) => Number.isInteger(v) }))).to.throw(Error);
    });

    it('Should call passed function against value and return bound object if valid', () => {
        const self = { success: true };
        const expression = compound.bind(self)(1, 'allOf', { isInt: true }, { isInt: (v) => Number.isInteger(v) });
        expect(expression).to.equal(self);
    });
});