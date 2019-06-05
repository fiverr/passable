import Enforce from './index';
import { random } from 'faker';
import runnables from './runnables';
import { expect } from 'chai';
const allRules = Object.keys(runnables);
const _proxy = Proxy;

const suite = (noProxy) => describe('Test Passable\'s enforce function', () => {
    let enforce = new Enforce({});

    if (noProxy) {
        before(() => {
            global.Proxy = undefined;
            delete global.Proxy;
            enforce = new Enforce({});
        });

        after(() => {
            global.Proxy = _proxy;
        });
    }

    describe('Rules object', () => {
        it('Should expose rules as functions', () => {
            const en = enforce();
            allRules.forEach((rule) => expect(en[rule]).to.be.a('function'));
        });

        it('Should perdictably return rule object with same rules', () => {
            expect(Object.keys(enforce())).to.deep.equal(Object.keys(enforce()));
        });

        it('Should return same rules object after every rule call', () => {
            let en;

            en = enforce(1);
            expect(en.isNumber()).to.deep.equal(en.isNumeric());
            en = enforce('1');
            expect(en.isString()).to.deep.equal(en.isNotEmpty());
            en = enforce([]);
            expect(en.isArray()).to.deep.equal(en.lengthEquals(0));
        });
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


suite(false);
suite(true);

