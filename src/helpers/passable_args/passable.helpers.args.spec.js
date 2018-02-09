'use strict';

import passableArgs from './index';
import { expect } from 'chai';

const generalArgsError = "[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Tests, Custom.";

describe('Test Passable arguments logic', () => {
    const noop = () => undefined;

    it('Should throw an exception when given no arguments', () => {
        expect(passableArgs.bind(null, [])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'undefined', expected tests to be a function.");
    });

    it('Should throw an exception when given only a single argument', () => {
        expect(passableArgs.bind(null, ['basic'])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'undefined', expected tests to be a function.");
    });

    it('Should throw an exception when tests is not a function', () => {
        expect(passableArgs.bind(null, [], 'noop', {}))
            .to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'string', expected tests to be a function.");
    });

    it('Should throw an exception when specific does not follow convention', () => {
        expect(passableArgs.bind(null, undefined, noop, {})).to.throw(generalArgsError);
        expect(passableArgs.bind(null, noop, noop, {})).to.throw(generalArgsError);
        expect(passableArgs.bind(null, true, noop, {})).to.throw(generalArgsError);
    });

    it('Should return given "tests", default specific to an array and custom to object', () => {
        const value = passableArgs(null, noop);
        expect(value).to.deep.equal({
            tests: noop,
            custom: {},
            specific: {
                only: new Set(),
                not: new Set()
            }
        });
    });

    it('Should return all attrs, not use default values', () => {
        const value = passableArgs(['noop'], noop, {noop});
        expect(value).to.deep.equal({
            specific: {
                only: new Set(['noop']),
                not: new Set()
            },
            tests: noop,
            custom: {noop}
        });
    });

    it('Should return specific and tests, default on custom', () => {
        const value = passableArgs(['Yo'], noop);
        expect(value).to.deep.equal({
            specific: {
                only: new Set(['Yo']),
                not: new Set()
            },
            tests: noop,
            custom: {}
        });
    });

    it('Should return custom and tests, default on specific', () => {
        const value = passableArgs(null, noop, {t: noop});
        expect(value).to.deep.equal({
            specific: {
                only: new Set(),
                not: new Set()
            },
            tests: noop,
            custom: {t: noop}
        });
    });

    it('Should throw an exception if either specific is of a wrong type', () => {
        expect(passableArgs.bind(null, true, noop)).to.throw(generalArgsError);
        expect(passableArgs.bind(null, 1, noop)).to.throw(generalArgsError);
        expect(passableArgs.bind(null, noop, noop)).to.throw(generalArgsError);
    });

});
