'use strict'

import enforce from './index';
import chai from 'chai';

const expect = chai.expect;

describe(`Test Passable's en function`, () => {
    it('Should expose all API functions', () => {
        const en = enforce();
        expect(en).to.have.ownProperty('fin');
        expect(en).to.have.ownProperty('allOf');
        expect(en).to.have.ownProperty('anyOf');
        expect(en).to.have.ownProperty('noneOf');
    });

    it('Should allow chaining all functions after allOf', () => {
        const allOf = enforce().allOf({});
        expect(allOf).to.have.ownProperty('fin');
        expect(allOf).to.have.ownProperty('allOf');
        expect(allOf).to.have.ownProperty('anyOf');
        expect(allOf).to.have.ownProperty('noneOf');
    });

    it('Should allow chaining all functions after anyOf', () => {
        const anyOf = enforce().anyOf({});
        expect(anyOf).to.have.ownProperty('fin');
        expect(anyOf).to.have.ownProperty('allOf');
        expect(anyOf).to.have.ownProperty('anyOf');
        expect(anyOf).to.have.ownProperty('noneOf');
    });

    it('Should allow chaining all functions after anyOf', () => {
        const noneOf = enforce().noneOf({});
        expect(noneOf).to.have.ownProperty('fin');
        expect(noneOf).to.have.ownProperty('allOf');
        expect(noneOf).to.have.ownProperty('anyOf');
        expect(noneOf).to.have.ownProperty('noneOf');
    });

    it('Should return test result after fin', () => {
        const res1 = enforce(5).noneOf({ largerThan: 4 }).fin();
        const res2 = enforce(5).allOf({ largerThan: 4 }).fin();
        expect(res1).to.equal(false);
        expect(res2).to.equal(true);
    });
});