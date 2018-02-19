'use strict';

import Passable from '../Passable.js';
import ResultObject from '../result_object';
import { expect } from 'chai';

const specificError = (type) => `[Passable]: Failed to execute 'Passable constructor': Unexpected '${type}'. Expected \`specific\` at position 1.`;

describe('Test passable\'s class constructor ', () => {

    const noop = () => null;
    const passable = (...args) => new Passable(...args);

    describe('Test arguments', () => {
        it('Should throw a TypeError for a non-string name', () => {

            expect(() => passable(1, null, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'number', expected string.");
            expect(() => passable({}, null, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'object', expected string.");
            expect(() => passable(noop, null, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'function', expected string.");
        });

        it('Should throw TypeError if `tests` is not a function', () => {
            expect(() => passable('MyForm', null, 'noop'))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'string'. Expected `tests` at position 2.");
        });

        it('Should throw an exception when specific does not follow convention', () => {
            expect(() => passable('FormName', undefined)).to.throw(specificError('undefined'));
            expect(() => passable('FormName', noop)).to.throw(specificError('function'));
            expect(() => passable('FormName', true)).to.throw(specificError('boolean'));
        });
    });

    it('Should return result object', () => {
        const v = new Passable('FormName', '', noop);
        expect(v instanceof ResultObject).to.equal(true);
    });

    it('Should pass down `test` function to `tests` callback', () => {
        const p = new Passable('name', null, (test) => {
            expect(test).to.be.a('function');
        });
    });

    it('Calls tests argument', (done) => {
        new Passable('FormName', '', () => {
            done();
        });
    });

});