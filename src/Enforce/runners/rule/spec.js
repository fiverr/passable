import single from './index';
import { expect } from 'chai';

describe('Test Passable\'s enforce - chainable - single function', () => {

    it('Should run passed function against value and throw if invalid', () => {
        expect(() => single((n) => n === 2), 1).to.throw(Error);
    });

    it('Should run passed function against value and return silently if valid', () => {
        expect(single((n) => n === 1, 1)).to.equal(undefined);
    });
});