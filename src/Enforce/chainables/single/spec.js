'use strict';

import single from './index';
import { expect } from 'chai';

describe('Test Passable\'s enforce - chainable - single function', () => {

    it('Should call passed function against value and throw if invalid', () => {
        expect(() => single.bind({})(1, (n) => n === 2)).to.throw(Error);
    });

    it('Should call passed function against value and return bound object if valid', () => {
        const self = { success: true};
        expect(single.bind(self)(1, (n) => n === 1)).to.equal(self);
    });
});