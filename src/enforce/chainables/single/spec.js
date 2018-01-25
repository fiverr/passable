'use strict';

import single from './index';
import { expect } from 'chai';

describe('Test Passable\'s enforce - chainable - single function', () => {
    it('Should return bound object if already invalid', () => {
        const self = { valid: false };
        expect(single.bind(self)()).to.equal(self);
    });

    it('Should call passed function against value and add valid:true to bound object', () => {
        const self = { success: true };
        const expression = single.bind(self)(1, (n) => n === 1);
        expect(expression.valid).to.equal(true);
        expect(self.valid).to.equal(true);
    });

    it('Should call passed function against value and throw if invalid', () => {
        expect(() => single.bind({})(1, (n) => n === 2)).to.throw(Error);
    });

    it('Should call passed function against value and return bound object if valid', () => {
        const self = { success: true};
        expect(single.bind(self)(1, (n) => n === 1)).to.equal(self);
    });
});