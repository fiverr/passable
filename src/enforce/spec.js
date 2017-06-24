'use strict';

import enforce from './index';
import chai from 'chai';

const expect = chai.expect;

describe('Test Passable\'s enforce function', () => {
    it('Should expose all API functions', () => {
        const en = enforce();
        expect(en.fin).to.be.a('function');
        expect(en.allOf).to.be.a('function');
        expect(en.anyOf).to.be.a('function');
        expect(en.noneOf).to.be.a('function');
    });

    it('Should allow chaining all functions after allOf', () => {
        const allOf = enforce().allOf({});
        expect(allOf.fin).to.be.a('function');
        expect(allOf.allOf).to.be.a('function');
        expect(allOf.anyOf).to.be.a('function');
        expect(allOf.noneOf).to.be.a('function');
    });

    it('Should allow chaining all functions after anyOf', () => {
        const anyOf = enforce().anyOf({});
        expect(anyOf.fin).to.be.a('function');
        expect(anyOf.allOf).to.be.a('function');
        expect(anyOf.anyOf).to.be.a('function');
        expect(anyOf.noneOf).to.be.a('function');
    });

    it('Should allow chaining all functions after anyOf', () => {
        const noneOf = enforce().noneOf({});
        expect(noneOf.fin).to.be.a('function');
        expect(noneOf.allOf).to.be.a('function');
        expect(noneOf.anyOf).to.be.a('function');
        expect(noneOf.noneOf).to.be.a('function');
    });

    it('Should return test result after fin', () => {
        const res1 = enforce(5).noneOf({ largerThan: 4 }).fin();
        const res2 = enforce(5).allOf({ largerThan: 4 }).fin();
        expect(res1).to.equal(false);
        expect(res2).to.equal(true);
    });
});