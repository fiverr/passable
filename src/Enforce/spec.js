import Enforce from './index';
import { rules } from './runnables';
import { expect } from 'chai';

const allRules = Object.keys(rules);
const enforce = new Enforce({});

const suite = () => describe('Test Passable\'s enforce function', () => {

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

        it('Should throw on failing custom rule in regular test', () => {
            const t = () => enforce('The name is Snowball').endsWith('Snuffles');
            expect(t).to.throw(Error);
        });

        it('Should return silently for custom rule in regular test', () => {
            enforce('Impossible! The name is Snowball').endsWith('Snowball').isImpossible();
        });
    });

    it('Should throw errors on failing enforces', () => {
        const isNumber = () => enforce('a').isNumber(true);
        expect(isNumber).to.throw(Error);
    });
});

describe('Test Enforce rules', () => {
    describe('Test size rules', () => {

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
