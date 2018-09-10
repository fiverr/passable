'use strict';

import Passable from '../Passable.js';
import ResultObject from '../result_object';
import faker from 'faker';
import { noop } from 'lodash';
import sinon from 'sinon';
import { expect } from 'chai';

const specificError = (type) => `[Passable]: Failed to execute 'Passable constructor': Unexpected '${type}'. Expected \`specific\` at position 2.`;

describe("Test Passable's class constructor ", () => {
    const passable = (...args) => new Passable(...args);

    describe('Test arguments', () => {
        it('Should throw a TypeError for a non-string name', () => {

            expect(() => passable(1, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'number', expected string.");
            expect(() => passable({}, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'object', expected string.");
            expect(() => passable(noop, noop))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'function', expected string.");
        });

        it('Should throw TypeError if `tests` is not a function', () => {
            expect(() => passable('MyForm', 'noop', null))
                .to.throw("[Passable]: Failed to execute 'Passable constructor': Unexpected 'string'. Expected `tests` at position 1.");
        });

        it('Should throw an exception when specific does not follow convention', () => {
            expect(() => passable('FormName', noop, noop)).to.throw(specificError('function'));
            expect(() => passable('FormName', noop, true)).to.throw(specificError('boolean'));
        });
    });

    it('Should pass down `test` function to `tests` callback', () => {
        const p = new Passable('name', (test) => {
            expect(test).to.be.a('function');
        });
    });

    it('Calls `tests` argument', (done) => {
        new Passable('FormName', () => done());
    });
});