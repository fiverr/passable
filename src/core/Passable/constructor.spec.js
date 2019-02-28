'use strict';

import Passable from '.';
import ResultObject from '../ResultObject';
import faker from 'faker';
import { noop } from 'lodash';
import sinon from 'sinon';
import { expect } from 'chai';

describe("Test Passable's class constructor ", () => {
    const passable = (...args) => new Passable(...args);

    describe('Test arguments', () => {
        it('Should throw a TypeError for a non-string name', () => {

            expect(() => passable(1, noop))
                .to.throw(TypeError);
            expect(() => passable({}, noop))
                .to.throw(TypeError);
            expect(() => passable(noop, noop))
                .to.throw(TypeError);
        });

        it('Should throw TypeError if `tests` is not a function', () => {
            expect(() => passable('MyForm', 'noop', null))
                .to.throw(TypeError);
        });

        it('Should throw an exception when specific does not follow convention', () => {
            expect(() => passable('FormName', noop, noop)).to.throw(TypeError);
            expect(() => passable('FormName', noop, true)).to.throw(TypeError);
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