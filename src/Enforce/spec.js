'use strict';

import Enforce, { enforce } from './index';
import rules from './rules';
import runners from './runners';
import { expect } from 'chai';

const allRules = Object.keys(rules);
const allRunners = Object.keys(runners);

describe('Test Passable\'s enforce function', () => {
    it('Should expose all API functions', () => {
        const en = enforce();
        allRunners.forEach((runner) => expect(en[runner]).to.be.a('function'));
    });

    it('Should expose rules as functions', () => {
        const en = enforce();
        allRules.forEach((rule) => expect(en[rule]).to.be.a('function'));
    });

    it('Enforce constructor should return a proxy object', () => {
        const enforce = new Enforce();
        expect(enforce instanceof Proxy).to.equal(true);
    });

    describe('Test custom rule extensions', () => {

        let enforce;

        beforeEach(() => {
            enforce = new Enforce({
                isImpossible: (v) => !!v.match(/impossible/i),
                endsWith: (v, arg1) => v.slice(-arg1.length) === arg1
            });
        });

        it('Should throw on failing custom rule in compound test', () => {
            const t = () => enforce('The name is Snowball').allOf({ endsWith: 'Snuffles' });
            expect(t).to.throw(Error);
        });

        it('Should throw on failing custom rule in compound test', () => {
            const t = () => enforce('impossible').noneOf({ isImpossible: null });
            expect(t).to.throw(Error);
        });

        it('Should throw on failing custom rule in regular test', () => {
            const t = () => enforce('The name is Snowball').endsWith('Snuffles');
            expect(t).to.throw(Error);
        });

        it('Should return silently for custom rule in compound test', () => {
            enforce('The name is Snowball').anyOf({
                endsWith: 'Snowball',
                isImpossible: null
            });
        });

        it('Should return silently for custom rule in regular test', () => {
            enforce('Impossible! The name is Snowball').endsWith('Snowball').isImpossible();
        });
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
            noneOf = () => enforce(1).noneOf({ largerThan: 0 }),
            isNumber = () => enforce('a').isNumber(true);
        expect(allOf).to.throw(Error);
        expect(anyOf).to.throw(Error);
        expect(noneOf).to.throw(Error);
        expect(isNumber).to.throw(Error);
    });
});

describe('Test Enforce rules', () => {
    describe('Test size rules', () => {
        it('Should give back correct responses for size rules inside runners', () => {
            const res1 = () => enforce(5).allOf({ largerThan: 4 }),
                res2 = () => enforce([]).allOf({ largerThan: 4 }),
                res3 = () => enforce(5).allOf({ smallerThan: 4 }),
                res4 = () => enforce('no.').allOf({ smallerThan: 4 }),
                res5 = () => enforce(4).allOf({ sizeEquals: 4 }),
                res6 = () => enforce(4).allOf({ sizeEquals: 3 }),
                res7 = () => enforce(0).allOf({ isEmpty: true }),
                res8 = () => enforce([]).allOf({ isEmpty: false }),
                res9 = () => enforce('no').allOf({ isEmpty: true });

            [res1, res4, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res2, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for size rules when chained', () => {
            const res1 = () => enforce(5).largerThan(4),
                res2 = () => enforce([]).largerThan(4),
                res3 = () => enforce(5).smallerThan(4),
                res4 = () => enforce('no.').smallerThan(4),
                res5 = () => enforce(4).sizeEquals(4),
                res6 = () => enforce(4).sizeEquals(3),
                res7 = () => enforce(0).isEmpty(true),
                res8 = () => enforce([]).isEmpty(false),
                res9 = () => enforce('no').isEmpty(true);

            [res1, res4, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res2, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

    });

    describe('Test lang rules', () => {
        it('Should give back correct responses for lang rules inside runners', () => {
            const res1 = () => enforce(5).allOf({ isArray: true }),
                res2 = () => enforce([]).allOf({ isArray: true }),
                res3 = () => enforce([]).allOf({ isArray: false }),
                res4 = () => enforce(5).allOf({ isString: true }),
                res5 = () => enforce('no.').allOf({ isString: true }),
                res6 = () => enforce('4').allOf({ isString: false }),
                res7 = () => enforce(4).allOf({ isNumber: true }),
                res8 = () => enforce(4).allOf({ isNumber: false }),
                res9 = () => enforce('4').allOf({ isNumber: true });

            [res2, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res1, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for lang rules when chained', () => {
            const res1 = () => enforce(5).isArray(true),
                res2 = () => enforce([]).isArray(true),
                res3 = () => enforce([]).isArray(false),
                res4 = () => enforce(5).isString(true),
                res5 = () => enforce('no.').isString(true),
                res6 = () => enforce('4').isString(false),
                res7 = () => enforce(4).isNumber(true),
                res8 = () => enforce(4).isNumber(false),
                res9 = () => enforce('4').isNumber(true);

            [res2, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res1, res3, res6, res8, res9].forEach((test) => expect(test).to.throw(Error));
        });
    });

    describe('Test content rules', () => {
        it('Should give back correct responses for content rules inside runners', () => {
            const res1 = () => enforce('hello').allOf({ matches: /^[a-zA-Z]{4,7}$/ }),
                res2 = () => enforce('foo').allOf({ matches: /^[a-zA-Z]{4,7}$/ }),
                res3 = () => enforce(44).allOf({ matches: '[0-9]' }),
                res4 = () => enforce(2).allOf({ inside: [1, 2, 3] }),
                res5 = () => enforce('or').allOf({ inside: 'Hello World!' }),
                res6 = () => enforce('4').allOf({ inside: { a: 1, b: 2 } });

            [res1, res3, res4, res5].forEach((test) => expect(test).to.not.throw());
            [res2, res6].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for content rules when chained', () => {
            const res1 = () => enforce('hello').matches(/^[a-zA-Z]{4,7}$/),
                res2 = () => enforce('foo').matches(/^[a-zA-Z]{4,7}$/),
                res3 = () => enforce(44).matches('[0-9]'),
                res4 = () => enforce(2).inside([1, 2, 3]),
                res5 = () => enforce('or').inside('Hello World!'),
                res6 = () => enforce('4').inside({ a: 1, b: 2 });

            [res1, res3, res4, res5].forEach((test) => expect(test).to.not.throw());
            [res2, res6].forEach((test) => expect(test).to.throw(Error));
        });
    });
});