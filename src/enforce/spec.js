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

describe('Test Enforce rules', () => {
    it('Should give back correct responses for size rules', () => {
        const res1 = enforce(5).allOf({ largerThan: 4 }).fin(),
            res2 = enforce([]).allOf({ largerThan: 4 }).fin(),
            res3 = enforce(5).allOf({ smallerThan: 4 }).fin(),
            res4 = enforce('no.').allOf({ smallerThan: 4 }).fin(),
            res5 = enforce(4).allOf({ sizeEquals: 4 }).fin(),
            res6 = enforce(4).allOf({ sizeEquals: 3 }).fin(),
            res7 = enforce(0).allOf({ isEmpty: true }).fin(),
            res8 = enforce([]).allOf({ isEmpty: false }).fin(),
            res9 = enforce('no').allOf({ isEmpty: true }).fin();

        expect(res1).to.equal(true);
        expect(res2).to.equal(false);
        expect(res3).to.equal(false);
        expect(res4).to.equal(true);
        expect(res5).to.equal(true);
        expect(res6).to.equal(false);
        expect(res7).to.equal(true);
        expect(res8).to.equal(false);
        expect(res9).to.equal(false);
    });

    it('Should give back correct responses for lang rules', () => {
        const res1 = enforce(5).allOf({ isArray: true }).fin(),
            res2 = enforce([]).allOf({ isArray: true }).fin(),
            res3 = enforce([]).allOf({ isArray: false }).fin(),
            res4 = enforce(5).allOf({ isString: true }).fin(),
            res5 = enforce('no.').allOf({ isString: true }).fin(),
            res6 = enforce('4').allOf({ isString: false }).fin(),
            res7 = enforce(4).allOf({ isNumber: true }).fin(),
            res8 = enforce(4).allOf({ isNumber: false }).fin(),
            res9 = enforce('4').allOf({ isNumber: true }).fin();

        expect(res1).to.equal(false);
        expect(res2).to.equal(true);
        expect(res3).to.equal(false);
        expect(res4).to.equal(false);
        expect(res5).to.equal(true);
        expect(res6).to.equal(false);
        expect(res7).to.equal(true);
        expect(res8).to.equal(false);
        expect(res9).to.equal(false);
    });

    it('Should give back correct responses for content rules', () => {
        const res1 = enforce('hello').allOf({ matches: /^[a-zA-Z]{4,7}$/ }).fin(),
            res2 = enforce('foo').allOf({ matches: /^[a-zA-Z]{4,7}$/ }).fin(),
            res3 = enforce(44).allOf({ matches: '[0-9]' }).fin(),
            res4 = enforce(2).allOf({ inside: [1, 2, 3] }).fin(),
            res5 = enforce('or').allOf({ inside: 'Hello World!' }).fin(),
            res6 = enforce('4').allOf({ inside: {a: 1, b: 2} }).fin();

        expect(res1).to.equal(true);
        expect(res2).to.equal(false);
        expect(res3).to.equal(true);
        expect(res4).to.equal(true);
        expect(res5).to.equal(true);
        expect(res6).to.equal(false);
    });
});