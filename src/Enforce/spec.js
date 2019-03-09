'use strict';

import Enforce from './index';
import { rules, compounds } from './runnables';
import { expect } from 'chai';

const allRules = Object.keys(rules);
const allCompounds = Object.keys(compounds);
const enforce = new Enforce({});

const suite = () => describe('Test Passable\'s enforce function', () => {
    it('Should expose all API functions', () => {
        const en = enforce();
        allCompounds.forEach((compound) => expect(en[compound]).to.be.a('function'));
    });

    it('Should expose rules as functions', () => {
        const en = enforce();
        allRules.forEach((rule) => expect(en[rule]).to.be.a('function'));
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
        it('Should allow chaining all compounds after allOf if not thrown', () => {
            const allOf = enforce(1).allOf({ largerThan: 0 });
            allCompounds.forEach((compound) => expect(allOf[compound]).to.be.a('function'));
        });

        it('Should allow chaining all rules after allOf if not thrown', () => {
            const allOf = enforce(1).allOf({ largerThan: 0 });
            allRules.forEach((rule) => expect(allOf[rule]).to.be.a('function'));
        });

        it('Should allow chaining all compounds after anyOf if not thrown', () => {
            const anyOf = enforce(1).anyOf({ largerThan: 0 });
            allCompounds.forEach((compound) => expect(anyOf[compound]).to.be.a('function'));
        });

        it('Should allow chaining all rules after anyOf if not thrown', () => {
            const anyOf = enforce(1).anyOf({ largerThan: 0 });
            allRules.forEach((rules) => expect(anyOf[rules]).to.be.a('function'));
        });

        it('Should allow chaining all compounds after noneOf if not thrown', () => {
            const noneOf = enforce(1).noneOf({ largerThan: 2 });
            allCompounds.forEach((compound) => expect(noneOf[compound]).to.be.a('function'));
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
        it('Should give back correct responses for size rules inside compounds', () => {
            const res1 = () => enforce(5).allOf({ largerThan: 4 }),
                res2 = () => enforce([]).allOf({ largerThan: 4 }),
                res3 = () => enforce(5).allOf({ smallerThan: 4 }),
                res4 = () => enforce('no.').allOf({ smallerThan: 4 }),
                res5 = () => enforce(4).allOf({ sizeEquals: 4 }),
                res6 = () => enforce(4).allOf({ sizeEquals: 3 }),
                res7 = () => enforce(0).allOf({ isEmpty: true }),
                res8 = () => enforce('no').allOf({ isEmpty: true }),
                res9 = () => enforce('no').allOf({ isEmpty: false });

            [res1, res4, res5, res7, res9].forEach((test) => expect(test).to.not.throw());
            [res2, res3, res6, res8].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for size rules when chained', () => {
            const res1 = () => enforce(5).largerThan(4),
                res2 = () => enforce([]).largerThan(4),
                res3 = () => enforce(5).smallerThan(4),
                res4 = () => enforce('no.').smallerThan(4),
                res5 = () => enforce(4).sizeEquals(4),
                res6 = () => enforce(4).sizeEquals(3),
                res7 = () => enforce(0).isEmpty(),
                res8 = () => enforce('no').isEmpty();

            [res1, res4, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res2, res3, res6, res8].forEach((test) => expect(test).to.throw(Error));
        });

    });

    describe('Test lang rules', () => {
        it('Should give back correct responses for lang rules inside compounds', () => {
            const res1 = () => enforce(5).allOf({ isArray: true }),
                res2 = () => enforce([]).allOf({ isArray: true }),
                res3 = () => enforce(5).allOf({ isString: true }),
                res4 = () => enforce('no.').allOf({ isString: true }),
                res5 = () => enforce(4).allOf({ isNumber: true }),
                res6 = () => enforce('4').allOf({ isNumber: true }),
                res7 = () => enforce('4').allOf({ isNumber: false });

            [res2, res4, res5, res7].forEach((test) => expect(test).to.not.throw());
            [res1, res3, res6].forEach((test) => expect(test).to.throw(Error));
        });

        it('Should give back correct responses for lang rules when chained', () => {
            const res1 = () => enforce(5).isArray(),
                res2 = () => enforce([]).isArray(),
                res3 = () => enforce(5).isString(),
                res4 = () => enforce('no.').isString(),
                res5 = () => enforce(4).isNumber(),
                res6 = () => enforce('4').isNumber(),
                res7 = () => enforce([1, 2, 3, 4]).isArray(),
                res8 = () => enforce([1, 2, 3, 4]).isArray(false),
                res9 = () => enforce('4').isNumber(false);

            [res2, res4, res5, res7, res9].forEach((test) => expect(test).to.not.throw());
            [res1, res3, res6, res8].forEach((test) => expect(test).to.throw(Error));
        });
    });

    describe('Test content rules', () => {
        it('Should give back correct responses for content rules inside compounds', () => {
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

    describe('Bad chain fallbacks', () => {
        it('Shoul return original property when chained item is not `runnable`', () => {
            expect(enforce().iDoNotExist).to.equal(undefined);
        });

        it('Shoul return original property when chained item is not a function', () => {
            const enforce = new Enforce({
                notAFunction: 'iAmNotAFunction'
            });

            expect(enforce().notAFunction).to.equal('iAmNotAFunction');
        });
    });
});

suite();

describe('Proxy is not available:', () => {
    const _proxy = global.Proxy;

    after(() => {
        global.Proxy = _proxy;
    });

    global.Proxy = undefined;
    suite();
});
