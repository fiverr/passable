'use strict';

import enforce from './index';
import rules from './rules';
import runners from './runners';
import { expect } from 'chai';

const allRules = Object.keys(rules);
const allRunners = Object.keys(runners).concat(['fin']);

describe('Test Passable\'s enforce function', () => {
    it('Should expose all API functions', () => {
        const en = enforce();
        allRunners.forEach((runner) => expect(en[runner]).to.be.a('function'));
    });

    it('Should expose rules as functions', () => {
        const en = enforce();
        allRules.forEach((rule) => expect(en[rule]).to.be.a('function'));
    });

    describe('Test function chaining', () => {
        it('Should allow chaining all runners after allOf if not thrown', () => {
            const allOf = enforce(1).allOf({ largerThan: 0 });
            allRunners.forEach((runner) => expect(allOf[runner]).to.be.a('function'));
        });

        it('Should allow chaining all rules after allOf if not thrown', () => {
            const allOf = enforce(1).allOf({ largerThan: 0 });
            allRules.forEach((rule) => expect(allOf[rule]).to.be.a('function'));
        });

        it('Should allow chaining all runners after anyOf if not thrown', () => {
            const anyOf = enforce(1).anyOf({ largerThan: 0 });
            allRunners.forEach((runner) => expect(anyOf[runner]).to.be.a('function'));
        });

        it('Should allow chaining all rules after anyOf if not thrown', () => {
            const anyOf = enforce(1).anyOf({ largerThan: 0 });
            allRules.forEach((rules) => expect(anyOf[rules]).to.be.a('function'));
        });

        it('Should allow chaining all runners after noneOf if not thrown', () => {
            const noneOf = enforce(1).noneOf({ largerThan: 2 });
            allRunners.forEach((runner) => expect(noneOf[runner]).to.be.a('function'));
        });

        it('Should allow chaining all rules after noneOf if not thrown', () => {
            const noneOf = enforce(1).noneOf({ largerThan: 2 });
            allRules.forEach((rules) => expect(noneOf[rules]).to.be.a('function'));
        });
    });

    it('Should throw errors on failing enforces', () => {
        const allOf = () => enforce(1).allOf({largerThan: 2}),
            anyOf = () => enforce(1).anyOf({smallerThan: 0}),
            noneOf = () => enforce(1).noneOf({largerThan: 0}),
            isEumber = () => enforce('a').isEumber(true);
        expect(allOf).to.throw(Error);
        expect(anyOf).to.throw(Error);
        expect(noneOf).to.throw(Error);
        expect(isEumber).to.throw(Error);
    });

    it('Should return test result after fin if not thrown', () => {
        const res1 = () => enforce(5).noneOf({ largerThan: 4 }).fin();
        const res2 = enforce(5).allOf({ largerThan: 4 }).fin();
        expect(res1).throws(Error);
        expect(res2).to.equal(true);
    });
});

describe('Test Enforce rules', () => {
    describe('Test size rules', () => {
        it('Should give back correct responses for size rules inside runners', () => {
            const res1 = enforce(5).allOf({ largerThan: 4 }).fin(),
                res2 = () => enforce([]).allOf({ largerThan: 4 }).fin(),
                res3 = () => enforce(5).allOf({ smallerThan: 4 }).fin(),
                res4 = enforce('no.').allOf({ smallerThan: 4 }).fin(),
                res5 = enforce(4).allOf({ sizeEquals: 4 }).fin(),
                res6 = () => enforce(4).allOf({ sizeEquals: 3 }).fin(),
                res7 = enforce(0).allOf({ isEmpty: true }).fin(),
                res8 = () => enforce([]).allOf({ isEmpty: false }).fin(),
                res9 = () => enforce('no').allOf({ isEmpty: true }).fin();

            [res1, res4, res5, res7].forEach((test) => expect(test).to.equal(true));
            [res2, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for size rules when chained', () => {
            const res1 = enforce(5).largerThan(4).fin(),
                res2 = () => enforce([]).largerThan(4).fin(),
                res3 = () => enforce(5).smallerThan(4).fin(),
                res4 = enforce('no.').smallerThan(4).fin(),
                res5 = enforce(4).sizeEquals(4).fin(),
                res6 = () => enforce(4).sizeEquals(3).fin(),
                res7 = enforce(0).isEmpty(true).fin(),
                res8 = () => enforce([]).isEmpty(false).fin(),
                res9 = () => enforce('no').isEmpty(true).fin();

            [res1, res4, res5, res7].forEach((test) => expect(test).to.equal(true));
            [res2, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

    });

    describe('Test lang rules', () => {
        it('Should give back correct responses for lang rules inside runners', () => {
            const res1 = () => enforce(5).allOf({ isArray: true }).fin(),
                res2 = enforce([]).allOf({ isArray: true }).fin(),
                res3 = () => enforce([]).allOf({ isArray: false }).fin(),
                res4 = () => enforce(5).allOf({ isString: true }).fin(),
                res5 = enforce('no.').allOf({ isString: true }).fin(),
                res6 = () => enforce('4').allOf({ isString: false }).fin(),
                res7 = enforce(4).allOf({ isNumber: true }).fin(),
                res8 = () => enforce(4).allOf({ isNumber: false }).fin(),
                res9 = () => enforce('4').allOf({ isNumber: true }).fin();

            [res2, res5, res7].forEach((test) => expect(test).to.equal(true));
            [res1, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for lang rules when chained', () => {
            const res1 = () => enforce(5).isArray(true).fin(),
                res2 = enforce([]).isArray(true).fin(),
                res3 = () => enforce([]).isArray(false).fin(),
                res4 = () => enforce(5).isString(true).fin(),
                res5 = enforce('no.').isString(true).fin(),
                res6 = () => enforce('4').isString(false).fin(),
                res7 = enforce(4).isNumber(true).fin(),
                res8 = () => enforce(4).isNumber(false).fin(),
                res9 = () => enforce('4').isNumber(true).fin();

            [res2, res5, res7].forEach((test) => expect(test).to.equal(true));
            [res1, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });
    });

    describe('Test content rules', () => {
        it('Should give back correct responses for content rules inside runners', () => {
            const res1 = enforce('hello').allOf({ matches: /^[a-zA-Z]{4,7}$/ }).fin(),
                res2 = () => enforce('foo').allOf({ matches: /^[a-zA-Z]{4,7}$/ }).fin(),
                res3 = enforce(44).allOf({ matches: '[0-9]' }).fin(),
                res4 = enforce(2).allOf({ inside: [1, 2, 3] }).fin(),
                res5 = enforce('or').allOf({ inside: 'Hello World!' }).fin(),
                res6 = () => enforce('4').allOf({ inside: { a: 1, b: 2 } }).fin();

            [res1, res3, res4, res5].forEach((test) => expect(test).to.equal(true));
            [res2, res6].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for content rules when chained', () => {
            const res1 = enforce('hello').matches(/^[a-zA-Z]{4,7}$/).fin(),
                res2 = () => enforce('foo').matches(/^[a-zA-Z]{4,7}$/).fin(),
                res3 = enforce(44).matches('[0-9]').fin(),
                res4 = enforce(2).inside([1, 2, 3]).fin(),
                res5 = enforce('or').inside('Hello World!').fin(),
                res6 = () => enforce('4').inside({ a: 1, b: 2 }).fin();

            [res1, res3, res4, res5].forEach((test) => expect(test).to.equal(true));
            [res2, res6].forEach((test) => expect(test).to.throw(Error));
        });
    });
});